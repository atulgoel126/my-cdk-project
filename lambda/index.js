/**
 * Entry point for our Hello World lambda function
 * @param event The event object contains metadata information about the API request.
 * @returns {Promise<{body: string, statusCode: number}>} Returns a 200 response with a JSON object containing the message "Hello World!"
 */
exports.handler = async (event) => {
    const response = {
        statusCode: 200, // 200 HTTP status code means success. Your browser will understand this as a success.
        body: JSON.stringify('Hello World!'),
    };
    return response;
};