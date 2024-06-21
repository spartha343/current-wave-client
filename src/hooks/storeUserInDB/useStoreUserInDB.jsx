const useStoreUserInDB = () => {
  return (user) => {
    fetch("https://current-wave.netlify.app/users/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
      });
  };
};

export default useStoreUserInDB;
