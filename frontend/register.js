async function registerMe() {
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;

    if(userName !== '' && userEmail !== '') {
      //If both name and email are provide, try to create a new user
      try{
        const response = await fetch('/api/v1/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail
            })
        })
        const data = await response.json();
        if(data.success) {
            console.log(data);
            window.location.href = `/movies-search.html?id=${data.user._id}`;
        } else {
            alert('User creation failed');
        }
      } catch (error) {
          console.log(error);
      }
    } else {
        alert('Please fill in all fields');
        return;
    }


}