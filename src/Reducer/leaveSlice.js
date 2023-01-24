import axios from "axios";
const { createSlice } = require("@reduxjs/toolkit");

const leavesSlice = createSlice({
	name: "leave",
	initialState: {},
	reducers: {
		setActiveLeaveReq(state, action) {
			state.ActiveLeaves = action.payload;
		},
		setArchiveLeaveReq(state, action) {
			state.ArchiveLeaves = action.payload;
		},
	},
});

export const { setActiveLeaveReq, setArchiveLeaveReq } =
	leavesSlice.actions;
export default leavesSlice.reducer;

export function fetchActiveLeaveReq() {
	return async function fetchActiveLeaveReqThunk(
		dispatch,
		getState
	) {
		try {
			var config = {
				method: "get",
				url: `${process.env.REACT_APP_HOST}/api/auth/attendance/all/leaves`,
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				credentials: "include",
			};

			// console.log(config.url);

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					dispatch(setActiveLeaveReq(resData.data));
				})
				.catch(function (error) {
					console.log(error);
					dispatch(setActiveLeaveReq([]));
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchArchiveLeaveReq() {
	return async function fetchArchiveLeaveReqThunk(
		dispatch,
		getState
	) {
		try {
			var config = {
				method: "get",
				url: `${process.env.REACT_APP_HOST}/api/auth/attendance/all/archived_leaves`,
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",

				withCredentials: true,
			};

			// console.log(config.url);

			axios(config)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					var resData = response.data;
					dispatch(setArchiveLeaveReq(resData.data));
				})
				.catch(function (error) {
					// console.log(error);
					dispatch(setArchiveLeaveReq([]));
				});
		} catch (error) {
			console.log(error);
		}
	};
}
