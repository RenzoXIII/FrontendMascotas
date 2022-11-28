import { ModeloPlan } from "./plan.modelo";
import { ModeloUsuario } from "./usuario.model";

export class ModeloMascota{
    id?: string;
    nombre?: string;
    foto?: string;
    estado?: string;
    especie?: string;
    comentario?: string;
    usuarioId?: string;
    planId?: string;
    usuario?: ModeloUsuario;
    plan?: ModeloPlan;

}