import React from "react";
import {connect} from "react-redux";
import Select from "../UI/select/Select";
import {changePagPage, getCompanies, getHouses} from "../../store/actions/main";
import Loader from "../UI/Loader/Loader";
import Table from "../Table/Table";
import Pagination from "../UI/Pagination/Pagination";
class Main extends React.Component {
    componentDidMount() {
        this.props.getCompanies(this.props.token)
    }
    selectChangeHandler = event => {
        this.props.getHouses(event.target.value)
    }
    changePageHandler = event => {
        this.props.changePagPage(Number(event.target.textContent))
    }

    render() {
        let table = <Loader/>
        if (this.props.houses) {
            if (this.props.houses.length) {
                table = <>
                    <Table houses={this.props.houses} />
                    <Pagination info={this.props.paginationInfo} onChangePage={this.changePageHandler}/>
                    </>
            }
            else {
                table = <h1>Не найдено домов для текущей организации</h1>
            }
        }
        return (
            <div className={'Main'}>
                {this.props.companies?
                    <Select label={'Выберите организацию'}
                        onChange={this.selectChangeHandler}
                            value={this.props.currentCompany || this.props.companies[0]}
                            options={this.props.companies.map(element => {
                                return {
                                    value: element.name,
                                    text: element.name
                                }
                            })}/>
                    : null}
                {table}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        companies: state.main.companies,
        currentCompany: state.main.currentCompany,
        houses: state.main.houses,
        paginationInfo: state.main.paginationInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCompanies : token => dispatch(getCompanies(token)),
        getHouses: company => dispatch(getHouses(company)),
        changePagPage: page => dispatch(changePagPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)