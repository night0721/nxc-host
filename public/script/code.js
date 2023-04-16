autosize(document.querySelector("textarea"));
document.addEventListener("keydown", async e => {
  if (e.ctrlKey && e.key == "s") {
    e.preventDefault();
    await fetch("/api/codes/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        value: document.getElementById("value").value,
      }),
    }).then(res => {
      window.location.href = res.url;
    });
  }
});
