import React,{useState} from "react";
// import "calc.css"
import "./calc.css"



const Calc= () => {

    const [salary, setSalary] = useState();
    const [allowanceList, setAllowanceList] = useState([{allowance: "", epf:false}]);
    const [deductionList, setDeductionList] = useState([{deduction:""}]);
    const [grossSalary, setGrossSalary] = useState()
    const [grossDeduction, setGrossDeduction] = useState()
    const [employeeEPF, setEmployeeEPF] = useState()
    const [EmployerEPF, setEmployerEPF] = useState()
    const [employerETF, setEmployerETF] = useState()
    const [netSalary, setNetSalary] = useState()
    const [costToCompany,setCostToCompany] = useState()

    console.log(allowanceList)
    console.log(deductionList)

    const handleAllowanceForm = () => {
        setAllowanceList([...allowanceList, {allowance:"", epf:false}])
    }

    const handleAllowanceFormRemove = (index) =>{
        const list = [...allowanceList]
        list.splice(index, 1)
        setAllowanceList(list)

        grossSalaryCal()
    }

    const handleAllowanceChange = (e,index) => {
        const {name, value} = e.target
        const list = [...allowanceList]
        list[index][name] = value
        setAllowanceList(list)

        grossSalaryCal()
    }

    const handleAllowanceEpfChange = (e,index) => {
        const {name, checked} = e.target
        const list = [...allowanceList]
        list[index][name] = checked
        setAllowanceList(list)

        grossSalaryCal()
    }

    const handleDeductionForm = () => {
        setDeductionList([...deductionList, {deduction:""}])
    }

    const handleDeductionFormRemove = (index) =>{
        const list = [...deductionList]
        list.splice(index, 1)
        setDeductionList(list)

        grossSalaryCal()
    }

    const handleDeductionChange = (e,index) => {
        const {name, value} = e.target
        const list = [...deductionList]
        list[index][name] = value
        setDeductionList(list)

        grossSalaryCal()
    }

    const grossSalaryCal = () => {
        // calculate sumAllowance
        let sumAllowance = 0
        sumAllowance = allowanceList.reduce((totalAll, currentValue) => totalAll = totalAll + parseInt(currentValue.allowance),0)
        let gSalary = 0
        gSalary = parseInt(salary) + sumAllowance
        setGrossSalary(gSalary)

        // calculate sumDeduction
        let sumDeduction = 0
        sumDeduction = deductionList.reduce((totalDed, currentValue) => totalDed = totalDed + parseInt(currentValue.deduction),0)
        setGrossDeduction(sumDeduction)

        // calculate sumOfEpfAllowance
        let sumOfEpfAllowance = 0.00
        allowanceList.forEach(sumOfEpf);

        function sumOfEpf(item) {
            if (item.epf === true)
                sumOfEpfAllowance += parseInt(item.allowance)
        }

        // Employee EPF(8%)
        let employeeEpf = 0.00
        employeeEpf = (parseInt(salary) + sumOfEpfAllowance) * 0.08
        setEmployeeEPF(employeeEpf)

        // Employer EPF(12%)
        let employerEpf = 0.00
        employerEpf = (parseInt(salary) + sumOfEpfAllowance) * 0.12
        setEmployerEPF(employerEpf)

        // Employer ETF(3%)
        let employerEtf = 0.00
        employerEtf = (parseInt(salary) + sumOfEpfAllowance) * 0.03
        setEmployerETF(employerEtf)

        // Net Salary
        let netSal = 0.00
        netSal = gSalary - sumDeduction - employeeEpf
        setNetSalary(netSal)

        // Cost To Company
        let costCompany = 0.00
        costCompany = gSalary - sumDeduction + employerEpf + employerEtf
        setCostToCompany(costCompany)

    }

    return(
        <container>
            <div style={{padding: '35px'}} className="row">
                {/*Main Form*/}
                <form className="col-5 formDiv" style={{marginLeft:"70px"}}>
                    <h1>Calculate Your Salary</h1>
                    <br/>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="number"
                            name="salary"
                            id="salary"
                            placeholder="with a placeholder"
                            // defaultValue={data.promoCategory}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <br/>
                    {/*Allowance Form*/}
                    <form>
                        <h3>Earnings</h3>
                        <p className="allowanceEar">Allowance, Fixed Allowance, Bonus and etc.</p>
                        {allowanceList.map((singleAllowance,index) =>(
                            <div key={index}>
                                <div className=" row">
                                    <div className="col-6">
                                        <input
                                            className="form-control col-2"
                                            type="number"
                                            name="allowance"
                                            id="allowance"
                                            placeholder="add a allowance"
                                            value={singleAllowance.allowance}
                                            onChange={(e) => handleAllowanceChange(e,index)}
                                            required
                                        />
                                        <input
                                            className="form-check-input "
                                            type="checkbox"
                                            id="epf"
                                            name="epf"
                                            value={singleAllowance.epf}
                                            // checked={singleAllowance.epf}
                                            onChange={(e) => handleAllowanceEpfChange(e,index)}
                                        />
                                        <p htmlFor="epf" > EPF/ETF</p>
                                    </div>
                                    <div className="col-6">
                                        {allowanceList.length - 1 === index && allowanceList.length !== 1  && (
                                            <button
                                                className="btn btn-danger "
                                                onClick = {() => handleAllowanceFormRemove(index)}
                                            >
                                                <span>
                                                    remove
                                                </span>
                                            </button>
                                        )}
                                    </div>


                                </div>
                                <div className="addAllowanceDiv">
                                    {allowanceList.length -1 === index  &&(
                                        <button
                                            className="btn btn-link"
                                            onClick={handleAllowanceForm}
                                        >
                                    <span>
                                        + Add New Allowance
                                    </span>
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </form>
                    <br/>

                    {/*Deduction Form*/}
                    <form>
                        <h3>Deductions</h3>
                        <p className="salaryDed">Salary Advances, Loan Deductions and all</p>
                        {deductionList.map((singleDeduction,index) =>(
                            <div key={index} className="deductionDiv">
                                <div className="row" style={{padding:"4px"}}>
                                    <div className="col-6">
                                        <input
                                            className="form-control "
                                            type="number"
                                            name="deduction"
                                            id="deduction"
                                            placeholder="add a deduction"
                                            value={singleDeduction.deduction}
                                            onChange={(e) => handleDeductionChange(e,index)}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        {deductionList.length - 1 === index && deductionList.length !== 1 &&  (
                                            <button
                                                className="btn btn-danger "
                                                onClick={() => handleDeductionFormRemove(index)}
                                            >
                                                <span>
                                                    remove
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {deductionList.length -1 === index  &&(
                                    <button
                                        className="btn btn-link"
                                        onClick={handleDeductionForm}
                                    >
                                    <span>
                                        + Add New Deduction
                                    </span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </form>
                </form>

                {/*chart*/}
                <form className="col-5 chartDiv" style={{marginLeft:"110px"}}>
                    <h1 >Your Salary</h1>
                    <div className="row chartSmallDivs">
                        <small  className="col-9 subText">Items</small>
                        <small  className="col-3 subText">Amount</small>
                    </div>

                    <div className="row chartSmallDivs">
                        <label className="form-label col-10">Gross Earning</label>
                        <p className="col-2">{grossSalary}</p>
                    </div>

                    <div className="row chartSmallDivs">
                        <label className="form-label col-10">Gross Deduction</label>
                        <p className="col-2">{grossDeduction}</p>
                    </div>

                    <div className="row chartSmallDivs">
                        <label className="form-label col-10">Employee EPF (8%)</label>
                        <p className="col-2">{employeeEPF}</p>
                    </div>

                    <div  className=" netSalDiv">
                        <div className="row">
                            <h4 className="col-9">Net Salary (Take Home)</h4>
                            <h5 className="col-3 ">{netSalary}</h5>
                        </div>
                    </div>

                    <p  className="subText contPara">Contribution from the Employer</p>
                    <br/>

                    <div className="row chartSmallDivs">
                    <label className="form-label col-10"> Employer EPF (12%)</label>
                    <p className="col-2">{EmployerEPF}</p>
                    </div>

                    <div className="row chartSmallDivs">
                    <label className="form-label col-10">Employer ETF (3%)</label>
                    <p className="col-2">{employerETF}</p>
                    </div>

                    <div className="row chartSmallDivs">
                    <label className="form-label col-10">CTC (Cost to Company)</label>
                    <p className="col-2">{costToCompany}</p>
                    </div>

                </form>
            </div>


        </container>

    );
}


export default Calc
