<h1>Welcome to the IIN take home test directory.</h1>

There are 2 directories, one for each part of the project.

1. `backend` - Contains a Javascript implemnetation of the backend problem. This is a node application which accepts command line arguments accessing an online database and returning population information about states between the years of 2013 and 2021.

    To run the program `cd` into the backend directory, run `npm install` locally to download the required libraries such as `node-fetch` and `command-line-args`. Then invoke the program in the command line by running `node index.js <flag and value>` there is a help flag accessible with `-h` for more information.

2. `frontend` - Contains an html component and associated files to display a faculty card. The html component itself is wrapped in a containing div to allow flexibility to the number of cards included. 

    This is a pure html/css implemntation assuming there would be some React/Vue Framework to pass variables to the placeholders. In a fullstack environment with a framework the contents would be iterated with a loop and display a `faculty_card` component for each element.

    To view this component, open the `faculty_card.html` file in a browser. The fonts required are stored within the the `fonts` folder and required media files are in the `media` directory.