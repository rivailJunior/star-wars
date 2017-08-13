import React, { Component } from 'react';
import RequestApi from '../../Request_api';

export default class Card extends Component{

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            name: '',
            url: '',
            birthdate: '',
            gender: '',
            planet: '',
            vehicles: '',
            films: '',
            planetName: null,
            carNames: []
        };
        this.getAllCars = this.getAllCars.bind(this);
        // this.getPlanets = this.getPlanets.bind(this);
        this.setPlanets = this.setPlanets.bind(this);
        this.update = this.update.bind(this);
        this.willUpdate = this.willUpdate.bind(this);
    }

    getPlanets() {
        RequestApi.raw(this.state.planet).then((res) => {
            this.setPlanets(res.name);
        });
    }

    setPlanets(planets){
        // this.setState({
        //     planetName:planets
        // });
    }

    getAllCars(car) {
        // this.setState({
        //    carNames: this.state.carNames.concat(car)
        // });
    }

    getVehicles() {
        this.state.vehicles.map((item)=> {
            RequestApi.raw(item).then((res) => {
                this.getAllCars(res.name)
            })
        });
    }

    componentDidMount(){
        this.update();
        // this.getPlanets();
        // this.getVehicles();
    }

    update() {
        this.setState({
            title: this.props.title,
            name: this.props.name,
            url: this.props.url,
            birthdate: this.props.birthdate,
            gender: this.props.gender,
            planet: this.props.planet,
            vehicles: this.props.vehicles,
            films: this.props.films,
            planetName: null,
            carNames: []
        })
    }

    willUpdate(obj) {
        obj = obj[0];
        this.setState({
            title: obj.title,
            name: obj.name,
            url: obj.url,
            birthdate: obj.birthdate,
            gender: obj.gender,
            planet: obj.planet,
            vehicles: obj.vehicles,
            films: obj.films,
            planetName: null,
            carNames: []
        });
    }

    // componentDidUpdate() {
    //     // console.log('this', this.props);
    //     this.forceUpdate();
    // }


    // shouldComponentUpdate() {
    //     if(this.props.update) return true;
    //     else return false;
    // }



    render() {
        return (
            <div className="card card-profile" id={this.props.key}>
                <div className="content">
                    <h6 className="category text-gray">{this.state.title}</h6>
                    <h4 className="card-title">{this.state.name}</h4>
                    <div className="card-content">
                        <p>BirthDate: {this.state.birthdate}</p>
                        <p>Gender: {this.state.gender} </p>
                        <p>Planet: {this.state.planetName} </p>
                        <p>Car: {
                            this.state.carNames.map((car) => {
                                return `${car}. `;
                            })
                        }
                        </p>
                    </div>

                    <a href={this.state.url} className="btn btn-primary btn-round">
                        See More
                        <div className="ripple-container"></div>
                    </a>
                </div>
            </div>
        );
    }
}