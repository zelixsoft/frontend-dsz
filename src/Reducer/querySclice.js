import axios from "axios";
const { createSlice } = require("@reduxjs/toolkit");

const querySlice = createSlice({
	name: "query",
	initialState: {},
	reducers: {
		setUnassignQuery(state, action) {
			state.UnassignQuery = action.payload;
		},
		setAssignQuery(state, action) {
			state.AssignQuery = action.payload;
		},
		setLostQuery(state, action) {
			state.LostQuery = action.payload;
		},
		setCloseQuery(state, action) {
			state.CloseQuery = action.payload;
		},
		setUAQID(state, action) {
			state.UAQID = action.payload;
		},
		setAQID(state, action) {
			state.AQID = action.payload;
		},
		setLQID(state, action) {
			state.LQID = action.payload;
		},
		setCQID(state, action) {
			state.CQID = action.payload;
		},
		setQuotations(state, action) {
			state.Quotations = action.payload;
		},
		setMDSidebar(state, action) {
			state.MDSidebar = action.payload;
		},
	},
});

export const {
	setAssignQuery,
	setUnassignQuery,
	setCloseQuery,
	setLostQuery,
	setUAQID,
	setAQID,
	setLQID,
	setCQID,
	setQuotations,
	setMDSidebar,
} = querySlice.actions;
export default querySlice.reducer;

export function fechUnAssignQuery() {
	return async function fechUnAssignQueryThunk(dispatch, getState) {
		try {
			var config = {
				method: "get",
				url: `${process.env.REACT_APP_HOST}/api/query/all/unassigned/active`,
				// withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				credentials: "include",
			};

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					if (resData.error) {
						// console.log("error while fatching querys");
					} else {
						dispatch(setUnassignQuery(resData.data));
						if (resData.data[0]) {
							dispatch(setUAQID(resData.data[0].query_id));
						} else {
							dispatch(setUAQID(undefined));
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function fechAssignQuery(EmployeeId) {
	return async function fechAssignQueryThunk(dispatch, getState) {
		try {
			var config = {
				method: "get",
				// url: `${process.env.REACT_APP_HOST}/api/query/all/employee/1`,
				url: `${process.env.REACT_APP_HOST}/api/query/all/employee?employee_id=${EmployeeId}&query_state=running`,
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",

				withCredentials: true,
			};

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					if (resData.error) {
						// console.log("error while fatching querys assign to Employee");
					} else {
						dispatch(setAssignQuery(resData.data));
						if (resData.data[0]) {
							dispatch(setAQID(resData.data[0].query_id));
						} else {
							dispatch(setAQID(undefined));
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function fechLostQuery(EmployeeId) {
	return async function fechLostQueryThunk(dispatch, getState) {
		try {
			var config = {
				method: "get",
				// url: `${process.env.REACT_APP_HOST}/api/query/all/employee/1`,
				url: `${process.env.REACT_APP_HOST}/api/query/all/employee?employee_id=${EmployeeId}&query_state=lost`,
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",

				withCredentials: true,
			};

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					if (resData.error) {
						// console.log("error while fatching querys assign to Employee");
					} else {
						dispatch(setLostQuery(resData.data));
						if (resData.data[0]) {
							dispatch(setLQID(resData.data[0].query_id));
						} else {
							dispatch(setLQID(undefined));
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function fechCloseQuery(EmployeeId) {
	return async function fechCloseQueryThunk(dispatch, getState) {
		try {
			var config = {
				method: "get",
				// url: `${process.env.REACT_APP_HOST}/api/query/all/employee/1`,
				url: `${process.env.REACT_APP_HOST}/api/query/all/employee?employee_id=${EmployeeId}&query_state=close`,
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",

				withCredentials: true,
			};

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					if (resData.error) {
						// console.log("error while fatching close querys assign to Employee");
					} else {
						dispatch(setCloseQuery(resData.data));

						if (resData.data[0]) {
							dispatch(setCQID(resData.data[0].query_id));
						} else {
							dispatch(setCQID(undefined));
						}
					}
				})
				.catch(function (error) {
					// console.log(error);
				});
		} catch (error) {
			// console.log(error);
		}
	};
}

export function fetchQuotations(AQID) {
	return async function fetchQuotationsThunk(dispatch, getState) {
		try {
			var config = {
				method: "get",
				url: `${process.env.REACT_APP_HOST}/api/quotation/all/${AQID}`,
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",

				withCredentials: true,
			};

			if (AQID) {

				axios(config)
					.then(function (response) {
						// console.log(JSON.stringify(response.data));
						const resData = response.data;

						if (resData.error) {
							// console.log(resData.error);
							dispatch(setQuotations([]));
						} else {
							dispatch(setQuotations(resData.data));
						}
					})
					.catch(function (error) {
						// console.log(error);
						dispatch(setQuotations([]));
					});

			} else {
				dispatch(setQuotations([]));
			}

		} catch (error) {
			console.log(error);
		}
	};
}
