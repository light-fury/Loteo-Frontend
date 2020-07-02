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

export const sendMessage = (name: string, email: string, message: string, investment: string) => {
    initAWS();

    return new Promise((resolve, reject) => {
        const ses = new window.AWS.SES({apiVersion: "2010-12-01"});
        const contactMail = process.env.CONTACT_EMAIL;

        ses.sendEmail({
            Source: contactMail,
            Destination: {
                ToAddresses: [contactMail]
            },
            Message: {
                Body: {
                    Html: {
                        Data: `You have been contacted by <b>${name}</b> (${email}) with the following message: <p><i>${message}</i></p> He/she is thinking about investing ${investment}.`
                    }
                },
                Subject: {
                    Data: "New message from Loteo Site"
                }
            }
        }, (err, data) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err, err.stack);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
