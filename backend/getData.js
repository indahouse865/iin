import fetch from 'node-fetch';

async function getStaticData() {
    try {
        const response = await fetch('https://datausa.io/api/data?drilldowns=State&measures=Population');
        if (response) {
            const textValue = await response.text();
            const json = JSON.parse(textValue);
            return json.data;
        } else {
            console.log("No response");
        }
    } catch (e) {
        console.log("Error accessing data from datausa. Please try again later")
        throw e;
    }
}

export default async function getData() {
    return await getStaticData();
}