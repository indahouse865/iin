import commandLineArgs from 'command-line-args';
import getData from './getData.js';
import { handleState, handleFullReport } from './handleData.js'

async function main() {
    const optionDefinitions = [
        { name: 'state_name', alias: 's', type: String },
        { name: 'full_report', alias: 'f', type: String },
        { name: 'help', alias: 'h', type: Boolean },
    ];

    let options;
    try {
        options = commandLineArgs(optionDefinitions);
    } catch (e) {
        console.log("If you are using a state with multiple words, please wrap the name in quotes like 'New York'");
        process.exit(1)
    }
    let mode;

    if (options.help) {
        console.log('\nWelcome to population checker - valid flags are:');
        console.log('full_report OR f and takes a year between 2013 and 2021.The output is ascending order of population in the state for the requested year');
        console.log('state_name OR s and takes a state name like Alabama and returns the states population each year from 2013 to 2021.')
        process.exit(0);
    }

    if (options.state_name && options.full_report) {
        console.log("Please only provide one flag and argument pair per run.");
        process.exit(1);
    }

    const arg = validateArgumentValue(options);
    let data;

    try {
        data = await getData();
    } catch (e) {
        process.exit(1);
    }

    if (mode === 'state') {
        handleState(arg, data);
    } else if (mode === 'full') {
        handleFullReport(arg, data);
    } else {
        console.log('No valid mode detected, please try again.');
        process.exit(1);
    }

    function validateArgumentValue(arg) {
        if (arg.state_name) {
            const sanitized = arg.state_name.toLowerCase().trim();
            mode = 'state';
            let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            states = states.map(ele => ele.toLowerCase());
            if (states.includes(sanitized)) {
                return sanitized;
            } else {
                console.log(`Argument value: ${arg.state_name} is not a valid state name. Please try again with a full state name like: Ohio`);
                process.exit(1);
            }
        } else if (arg.full_report) {
            mode = 'full';
            const argVal = parseInt(arg.full_report);
            if (isNaN(argVal) || argVal < 2013 || argVal > 2021) {
                console.log('Invalid year provided, valid years are in the range of 2013 - 2021');
                process.exit(1);
            } else {
                return argVal;
            }
        } else {
            console.log("No valid arguments. Please use 'state_name' or 'full_report'. Use -h flag for additional help.");
            process.exit(1);
        }
    }
}

main();