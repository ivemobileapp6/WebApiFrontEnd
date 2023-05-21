import React, { useState } from "react";
import styles from "./Register.css";

function RegisterForm() {
  const [userType, setUserType] = useState("public");
  const [staffKey, setStaffKey] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType !== "public" && staffKey === "") {
      setIsSuccess(false);
      setMessage("Staff Key cannot be empty for non-public users");
      return;
    }

    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phonenumber: e.target.phonenumber.value,
      userType,
    };

    if (userType === "staff") {
      payload.staffKey = staffKey;
    }

    try {
      const response = await fetch("https://webapiassignment.ivemobileapp6.repl.co/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Registration successful!");
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred, please try again.");
      console.error("Error:", error);
    }
  };

  return (

      <div className={styles.container}>
 
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          required
        />
        <select
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="staff">Staff</option>
        </select>
        {userType === "staff" && (
          <input
            type="text"
            name="staffKey"
            placeholder="Staff Key"
            value={staffKey}
            onChange={(e) => setStaffKey(e.target.value)}
            required
          />
        )}
        <button type="submit">Register</button>
      </form>
      {message && (
 <div className={isSuccess ? styles["success-message"] : styles["error-message"]}>            {message}
        </div>
      )}
     </div>

  );
}

export default RegisterForm;