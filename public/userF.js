async function guardarUsuarios(){
    event.preventDefault();

    let usuario = document.querySelector("#usuario").value;
    let nombre = document.querySelector("#nombre").value;
    let apellidos = document.querySelector("#apellidos").value;
    let contrasena = document.querySelector("#contrasena").value;
    let semestre = document.querySelector("#semestre").value;
    let carrera = document.querySelector("#carrera").value


    let newUser = {usuario, nombre, apellidos, contrasena, 
        carrera, semestre,materias:[""]}

    console.log(newUser);
    let resp = await fetch('/api/users',{
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json",
            "x-auth": "Test"
        }
    });

    console.log(resp);

    let info = await resp.json();
    console.log(info);

}