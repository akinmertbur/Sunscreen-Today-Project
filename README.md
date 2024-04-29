# Sunscreen Today

Sunscreen Today is a simple web application built with Node.js and Express that helps users determine whether sunscreen is needed today based on the UV index data of a specified location.

## Prerequisites

Before running this application, ensure you have the following:

- Node.js installed on your machine.
- MapQuest API Key for geocoding. You can obtain one [here](https://developer.mapquest.com/).
- OpenUV API Key for retrieving UV index data. You can obtain one [here](https://www.openuv.io/).

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/akinmertbur/Sunscreen-Today-Project.git
```

2. Navigate to the project directory:

```bash
cd Sunscreen-Today-Project
```

3. Install dependencies:
   
```bash
npm install
```

4. Create a `.env` file in the root directory of the project and add your API keys:

```bash
GEOCODING_API_KEY=your_mapquest_api_key
OPENUV_API_KEY=your_openuv_api_key
```

## Usage

To start the application, run:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Features

- Allows users to enter a location to determine if sunscreen is needed based on the UV index.
- Retrieves geographical coordinates of the location using the MapQuest API.
- Retrieves UV index data using the OpenUV API.
- Renders the UV index and sunscreen advisory on the homepage.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add my feature'`).
5. Push to the branch (`git push origin feature/my-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




