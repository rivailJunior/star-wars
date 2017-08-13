import React, { Component } from 'react';
import Nav from './components/header/Header';
import RequestApi from './Request_api';
import CardView from './components/card/Card';
import ReactDOM from 'react-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cast: [],
            list:  null,
            inputValue: null,
            update: false
        };
        // this.setCast = this.setCast.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getByName = this.getByName.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    setCast(object){
        this.setState({
            cast: object,
            update: true
        }, () => {
            this.forceUpdate()
        });
    }

    getAllByPeople(){
        RequestApi.request('people').then((res) => {
            this.setCast(res.results);
        });
    }

    getByName(name) {
        let search = `https://swapi.co/api/people/?search=${name}`;
        RequestApi.raw(search).then((res) => {
            this.setState({
                cast: []
            }, () => {
                this.setCast(res.results)
            })
        });
    }

    componentDidMount() {
        this.getAllByPeople();
    }

    onChange(e){
        this.setState({
            inputValue: e.target.value
        });
    }

    onClick() {
        this.getByName(this.state.inputValue)
    }


    render() {
        return (
            <div className="container">
                <Nav/>
                <div className="row">
                    <div className="col-md-4">
                        <input type="text"
                               onChange={this.onChange}
                               className="form-control"
                               placeholder="Search"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.onClick} >Find</button>
                </div>
                <div className="row">
                    {
                        this.state.cast.map((item, key) => {
                           return (
                            <div className="col-md-4" key={key}>
                                <CardView
                                    ref={(card) => this.cardviewref = card}
                                    title={item.title}
                                    name={item.name}
                                    birthdate={item.birth_year}
                                    gender={item.gender}
                                    vehicles={item.vehicles}
                                    planet={item.homeworld}
                                    films={item.films}
                                    url={item.url}
                                    update={this.state.update}
                                />
                            </div>
                          )
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
