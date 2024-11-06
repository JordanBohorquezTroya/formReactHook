import { create } from 'zustand'


export const useStore = create((set) => ({
    nombre: '',
    apellido: '',
    edad: 0,
    cedula: '',
    setNombre: (nombre) => set(() => ({ nombre: nombre })),
    setApellido: (apellido) => set(() => ({ apellido: apellido })),
    setEdad: (edad) => set(() => ({ edad: edad })),
    setCedula: (cedula) => set(() => ({ cedula: cedula })),
}))