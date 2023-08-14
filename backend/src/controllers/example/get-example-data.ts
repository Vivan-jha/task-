import { Controller } from "typings/express";

type RequestParams = void;
type RequestBody = void;
type RequestQuery = void;
type ResponseData = {
	hello: string;
};

export const get_example_data: Controller<RequestParams, ResponseData, RequestBody, RequestQuery> = async (
	req,
	res
) => {
	try {
		console.log("GET EXAMPLE DATA");

		res.status(200).json({
			success: true,
			code: 200,
			data: {
				hello: "world",
			},
		});
	} catch (err) {
		console.log("ERROR IN GET POSTS");
		console.log({ err });
		res.status(500).json({
			success: false,
			code: 500,
			error: "Internal Server Error",
		});
	}
};
