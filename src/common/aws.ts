declare global {
    interface Window {
        AWS: any;
    }
}

let initialized = false;

const initAWS = () => {
    if (initialized) {
        return;
    }

    window.AWS.config.region = process.env.AWS_REGION;
    window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID
    });
    initialized = true;
};

export const subscribeToNews = (email: string) => {
    initAWS();

    return new Promise((resolve, reject) => {
        const lambda = new window.AWS.Lambda({
            region: process.env.AWS_REGION,
            apiVersion: "2015-03-31"
        });

        lambda.invoke({
            FunctionName: process.env.AWS_LAMBDA_SUBSCRIBE,
            InvocationType: "RequestResponse",
            LogType: "None",
            Payload: JSON.stringify({
                email
            })
        }, (error, data) => {
            if (error) {
                prompt(error);
            } else {
                const result = JSON.parse(data.Payload);
                if (result.success) {
                    resolve();
                } else {
                    reject(result.statusCode);
                }
            }
        });
    });
};
