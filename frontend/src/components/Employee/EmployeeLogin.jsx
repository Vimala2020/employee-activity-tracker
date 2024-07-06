import React from "react";

const EmployeeLogin = () => {
    return(
         <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="email"><strong>Email: </strong></label>
                    <input type="email" name="email" autoComplete="off" placeholder="Enter Email Id" className="email"></input>
                </div>

                <div>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="password" autoComplete="off" placeholder=" Enter Password" className="password"></input>

                </div>
            </form>
         </div>
    )
}