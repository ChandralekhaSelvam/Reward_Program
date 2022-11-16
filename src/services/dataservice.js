export const getCustomerTransaction = () => {
    // return new Promise((resolve, reject) => {
    //     fetch('http://localhost:3000/mockData/dataSet.json',{
    //     headers : { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //      }
    //   })
    // .then(response => response.json())
    // .then(data => resolve(data))
    // .catch(error => reject(error));
    // });

    return fetch('http://localhost:3000/mockData/dataSet.json')
    .then(data => data.json())
}