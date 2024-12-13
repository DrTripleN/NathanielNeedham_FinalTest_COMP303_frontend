import{ useState, useEffect } from 'react';
import axios from "axios";

function BankList() {
    const [banks, setBanks] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:8763/api/',
    });

    useEffect(() => {
        instance.get("banks/all")
            .then(response => {
                setBanks(response.data);
            })
            .catch(error => {
                console.log("Error fetching Bank ", error);
            });
    }, []);
    return (
        <div className="mt-5">
            <h1 className="h1-banklist">Bank List</h1>
            <table className="table table-dark table-striped-columns table-hover">
                <thead>
                <tr>

                    <th>Bank Name</th>
                    <th>Bank Year</th>
                    <th>Number of Employees</th>
                    <th>Bank Address</th>
                    <th>Number of ATMs</th>
                    <th>Number of Branches</th>

                </tr>
                </thead>
                <tbody>
                {banks.length > 0 ? (
                    banks.map(bank => (
                        <tr key={bank.id}>
                            <td>{bank.bankName}</td>
                            <td>{bank.bankYear}</td>
                            <td>{bank.bankEmp}</td>
                            <td>{bank.bankAddress}</td>
                            <td>{bank.bankATMs}</td>
                            <td>{bank.bankBranches}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">
                            No Banks found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default BankList;