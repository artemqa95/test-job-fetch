import {
    CHANGE_COMPANY_ITEM,
    CHANGE_CURRENT_PAGE,
    FETCH_COMPANIES_LIST,
    FETCH_HOUSES_LIST,
    GET_PAGES_INFO, REMOVE_CURRENT_HOUSES
} from "../actions/actionTypes";

const initialState = {
    companies: null,
    currentCompany: null,
    houses: null,
    loading: false,
    paginationInfo: {currentPage: 1, elementsPerPage: 15}
}

export default function main(state = initialState, action) {
    switch (action.type) {
        default:
            return state
        case FETCH_COMPANIES_LIST:
            return {
                ...state, companies: action.companies
            }
        case FETCH_HOUSES_LIST:
            return {
                ...state, houses: action.houses
            }
        case CHANGE_COMPANY_ITEM:
            return {
                ...state, currentCompany: action.currentCompany
            }
        case GET_PAGES_INFO:
            return {
                ...state, paginationInfo: action.paginationInfo
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state, paginationInfo: action.paginationInfo
            }
        case REMOVE_CURRENT_HOUSES:
            return {
                ...state, houses: null
            }
    }
}