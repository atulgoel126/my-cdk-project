/**
 * Entry point for our Hello World lambda function
 * @param event The event object contains metadata information about the API request.
 * @returns {Promise<{body: string, statusCode: number}>} Returns a 200 response with a random numbe between 0 and 99
 */
exports.handler = async (event) => {
    const randomNumber = Math.floor(Math.random() * 100); // Generates a random number between 0 and 99
    const response = {
        statusCode: 200, // 200 HTTP status code means success. Your browser will understand this as a success.
        body: JSON.stringify(`Your lucky number is: ${randomNumber}`),
    };
    return response;
};