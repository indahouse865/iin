function handleState(state, data) {
    const filtered = data.filter((val, i) => {
        return val.State.toLowerCase() === state
    }).sort((a, b) => {
        return parseInt(a.Year) - parseInt(b.Year)
    });

    if (filtered.length > 0) {
        console.log(`The population history for ${state} in chronological order is...`);
        filtered.map(ele =>  {
            console.log(`${ele.Year}: ${ele.Population.toLocaleString()} people.`);
        });
    } else {
        console.log(`There is no valid data for ${state}. Please try again.`);
        process.exit(1);
    }
}

function handleFullReport(year, data) {
    const filtered = data.filter((val, i) => {
        return parseInt(val.Year) === year
    }).sort((a, b) => {
        return a.Population - b.Population;
    });

    if (filtered.length > 0) {
        console.log(`The population history for all states in ${year} in descending order is:`);
        filtered.map(ele =>  {
            console.log(`${ele.State}: ${ele.Population.toLocaleString()} people.`);
        });
    } else {
        console.log(`There is no valid data for ${year}. Please try again.`);
        process.exit(1);
    }
}

export {
    handleState, 
    handleFullReport
}