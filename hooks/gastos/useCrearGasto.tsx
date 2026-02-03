import { db } from "@/db/database";
import { useGetConceptoById } from "../Conceptos/useGetConceptoById";
import { useGetQuincenaActivaConConf } from "../quincenas/useGetQuincenaActivaConConfig";

//QUINCENA ACTUAL ACTIVA
//SACAR LA CONFIGURACION
//BUSCAR LA QUINCENA_CONFIGURACION EN BASE A LA CATEGORIA DEL CONCEPTO
//REGISTRAR EL GASTO CON LA QUINCENA_CONFIGURACION_ID
type crearGasto = {
  concepto_id: number | string;
  monto: number | string;
};

export const useCrearGasto = () => {
  const { getQuincenaActivaConConf } = useGetQuincenaActivaConConf();
  const { getConceptoById } = useGetConceptoById();

  const crearGasto = async (values: crearGasto) => {
    try {
      const quincenaActiva = getQuincenaActivaConConf();
      if (!quincenaActiva) {
        throw new Error("No hay quincena activa");
      }

      const concepto = getConceptoById(Number(values.concepto_id));
      if (!concepto) {
        throw new Error("Concepto no encontrado");
      }

      const configuracion = quincenaActiva.configuraciones.find(
        (conf) => conf.categoria_id === concepto.categoria_id,
      );

      if (!configuracion) {
        throw new Error(
          "No existe configuración para la categoría del concepto",
        );
      }

      const monto = Number(values.monto);
      if (isNaN(monto) || monto <= 0) {
        throw new Error("Monto inválido");
      }

      db.runSync(
        `
      INSERT INTO gastos (
        concepto_id,
        quincena_configuracion_id,
        monto
      )
      VALUES (?, ?, ?)
    `,
        [concepto.id, configuracion.id, monto],
      );
    } catch (error) {
      console.error("Error al crear gasto:", error);
      throw error;
    }
  };

  return { crearGasto };
};
