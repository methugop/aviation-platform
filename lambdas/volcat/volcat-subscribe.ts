
const handler = async(event: any) => {
    return {
        volcat: event.arguments.topic,
        text: "",
    };
};

export { handler };