import { useEffect } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useStore } from "./zustand/useStore";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


function App() {
  const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    edad: yup.number().required('La edad es requerida'),
    cedula: yup.string().required('La cédula es requerida'),
  }).required();

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      edad: 0,
      cedula: "",
    },
    resolver: yupResolver(schema),
  });

  
  const nombre = useStore((state) => state.nombre);
  const setNombre = useStore((state) => state.setNombre);
  const apellido = useStore((state) => state.apellido);
  const setApellido = useStore((state) => state.setApellido);
  const edad = useStore((state) => state.edad);
  const setEdad = useStore((state) => state.setEdad);
  const cedula = useStore((state) => state.cedula);
  const setCedula = useStore((state) => state.setCedula);

  const onSubmit = (data) => console.log(data);



 
  const formData = watch();
  useEffect(() => {
    const formDataGuardado = localStorage.getItem('formData');
    if (formDataGuardado) {
      const parsedData = JSON.parse(formDataGuardado);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

 
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);


  return (
    <Grid
      container
      alignItems="center"
      height="100vh"
    >
      
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={4}
        bgcolor={"rgba(0, 0, 0, 0.7)"} 
       
        
        borderRadius={3}
        boxShadow={3}
        sx={{
          width: { xs: "90%", sm: "60%", md: "40%" },
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={400} color="white">
          Formulario De Datos
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid sx={{ mt: 2 }}>
            <Controller
              name="nombre"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField 
                  color="secondary" focused 
                  type="text"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setNombre(e.target.value);
                  }}
                  slotProps={{
                    input: {
                      style: { color: 'white' } 
                    }
                  }}
                />
              )}
            />
            {errors.nombre?.message && <span style={{ color: "red" }}>{errors.nombre.message}</span>}
          </Grid>

          <Grid  sx={{ mt: 2 }}>
            <Controller
              name="apellido"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  color="secondary" focused 
                  type="text"
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setApellido(e.target.value);
                  }}
                  slotProps={{
                    input: {
                      style: { color: 'white' } 
                    }
                  }}
                />
              )}
            />
            {errors.apellido?.message && <span style={{ color: "red" }}>{errors.apellido.message}</span>}

          </Grid>

          <Grid sx={{ mt: 2 }}>
            <Controller
              name="edad"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  color="secondary" focused 
                  type="number"
                  label="Edad"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={(e) => {
                    onChange(+e.target.value);
                    setEdad(+e.target.value);
                  }}
                  slotProps={{
                    input: {
                      style: { color: 'white' } 
                    }
                  }}
                />
              )}
            />
            {errors.edad?.message && <span style={{ color: "red" }}>{errors.edad.message}</span>}

          </Grid>

          <Grid  sx={{ mt: 2 }}>
            <Controller
              name="cedula"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  color="secondary" focused 
                  type="text"
                  label="Cédula"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setCedula(e.target.value);
                  }}
                  slotProps={{
                    input: {
                      style: { color: 'white' } 
                    }
                  }}
                />
              )}
            />
          {errors.cedula?.message && <span style={{ color: "red" }}>{errors.cedula.message}</span>}

          </Grid>

          <Button
            type="submit"
            variant="contained"
            
            fullWidth
            sx={{ mt: 3 , backgroundColor: "rgba(0, 0, 0, 0.7)", border: "1px solid white", color: "white" }}
          >
            Enviar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
export default App;
