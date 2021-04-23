import axios from "axios";
import {
    CHANGE_COMPANY_ITEM,
    CHANGE_CURRENT_PAGE,
    FETCH_COMPANIES_LIST,
    FETCH_HOUSES_LIST,
    GET_PAGES_INFO, REMOVE_CURRENT_HOUSES
} from "./actionTypes";

export function getCompanies(token) {
    return async dispatch => {
        let url = 'http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/'
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
        const data = response.data.data;
        dispatch(getCompanyItems(data))
        dispatch(getHouses(data[0].name))
    }
}

export function getHouses (company) {
    return async (dispatch, getState) => {
        dispatch(removeHouses())
        if (company !== getState().main.currentCompany) changePageNumInState(1, dispatch, getState)
        const pagInfo = getState().main.paginationInfo
        const currentCompany = getState().main.companies.find(element => element.name === company)
        dispatch(changeCurrentCompany(company))
        let url = `http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/${currentCompany.id}/?page=${pagInfo.currentPage}&perPage=${pagInfo.elementsPerPage}`
        const response = await axios.get(url, {headers: {Authorization: `Bearer ${getState().auth.token}`}})
        const data = response.data
        const newPagInfo = {...pagInfo, ...data.links}
        dispatch(getPaginationInfo(newPagInfo))
        dispatch(getHousesItems(data.data))
    }
}

function changePageNumInState(pageNum, dispatch, getState) {
    const paginationInfo = {...getState().main.paginationInfo}
    paginationInfo.currentPage = pageNum
    dispatch(changeCurrentPage(paginationInfo))
}

export function changePagPage(pageNum) {
    return (dispatch, getState) => {
        dispatch(removeHouses())
        changePageNumInState(pageNum, dispatch, getState)
        dispatch(getHouses(getState().main.currentCompany))
    }
}

export function getCompanyItems (companies) {
    return {
        type: FETCH_COMPANIES_LIST, companies
    }
}

export function getHousesItems(houses) {
    return {
        type: FETCH_HOUSES_LIST, houses
    }
}

export function changeCurrentCompany(currentCompany) {
    return {
        type: CHANGE_COMPANY_ITEM, currentCompany
    }
}

export function getPaginationInfo(paginationInfo) {
    return {
        type: GET_PAGES_INFO, paginationInfo
    }
}

export function changeCurrentPage(paginationInfo) {
    return {
        type: CHANGE_CURRENT_PAGE, paginationInfo
    }
}

export function removeHouses() {
    return {
        type: REMOVE_CURRENT_HOUSES
    }
}