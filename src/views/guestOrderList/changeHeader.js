window.addEventListener("load", async () => {
    const admin = document.querySelector('#admin');
    const user = document.querySelector('#user');
    const guest = document.querySelector('#guest');

    const token = sessionStorage.getItem("token");
    if(token) {

        const res = await fetch("/api/admin/check", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

  const {result} = await res.json();

  if(result === "success") {
    admin.classList.remove('hidden');
    user.classList.add('hidden');
    guest.classList.add('hidden');

    return;
  } else {
    user.classList.remove('hidden');
    guest.classList.add('hidden');
    admin.classList.add('hidden');
    return;
  }
    }

    guest.classList.remove('hidden');
    user.classList.add('hidden');
    admin.classList.add('hidden');
});