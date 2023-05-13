# Updated Code Instructions

In the updated code:

- We use the `fetchData` function to handle the fetching of all necessary data.
- We use `Promise.all` to fetch student data in parallel.
- After fetching the student data, we extract the `schoolIds` and `legalguardianIds` from the fetched data.
- We create arrays of promises for fetching school data and legal guardian data.
- We use `Promise.all` again to fetch school data and legal guardian data in parallel.
- The fetched data is then set in the respective state variables.
- We use `try/catch` blocks to handle any errors that may occur during data fetching.
- The `onStudentsPick` function calls the `fetchData` function with the selected student IDs.
- The `StudentsTable` component receives the updated state variables as props.

These changes optimize the fetching of data by making parallel requests and updating the state only once for each type of data.
