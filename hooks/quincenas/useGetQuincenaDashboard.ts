import { useState } from "react";
import { useGetIngresoQuincenal } from "../Configuracion/useGetIngresoQuincenal";
import { useGetGastosByQuincenaId } from "../gastos/useGetGastosByQuincenaId";
import {
  DashboardCategoria,
  QuincenaDashboardResponse,
} from "./quincenas.types";
import { useGetQuincenaActivaConConf } from "./useGetQuincenaActivaConConfig";

//CONSULTAR QUINCENA CON CONFIGURACION
//CONSULTAR LOS GASTOS DE ESAS CONFIGURACIONES
//CALCULAR EN BASE AL INGRESO DE LA QUINCENA LOS PORCENAJES
//HACER LAS RESTAS DE GASTOS A LOS PORCENTAJES

export const useGetQuincenaDashboard = () => {
  const { getQuincenaActivaConConf } = useGetQuincenaActivaConConf();
  const { getGastosByQuincenaId } = useGetGastosByQuincenaId();
  const { getIngresoQuincenal } = useGetIngresoQuincenal();
  const [loading, setLoading] = useState(false);
  const getQuincenaDashboard = async (): Promise<QuincenaDashboardResponse> => {
    try {
      setLoading(true);
      const quincenaActiva = await getQuincenaActivaConConf();
      if (!quincenaActiva) {
        throw new Error("No hay quincena activa");
      }

      const gastos = await getGastosByQuincenaId(quincenaActiva.id);
      const ingresoQuincenal = getIngresoQuincenal();

      const detalles: DashboardCategoria[] = [];

      quincenaActiva.configuraciones.forEach((configuracion) => {
        const gastosCategoria = gastos.filter(
          (gasto) => gasto.categoria_id === configuracion.categoria_id,
        );

        const totalGastado = gastosCategoria.reduce(
          (sum, gasto) => sum + gasto.monto,
          0,
        );

        const base = ingresoQuincenal * (configuracion.porcentaje / 100);

        detalles.push({
          titulo: configuracion.nombre,
          porcentaje: configuracion.porcentaje,
          base,
          totalGastado: totalGastado,
          disponible: base - totalGastado,
        });
      });

      return {
        quincena: {
          id: quincenaActiva.id,
          fecha_inicio: quincenaActiva.fecha_inicio,
          fecha_fin: quincenaActiva.fecha_fin,
        },
        detalles,
      };
    } catch (error) {
      console.error("Error dashboard:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { getQuincenaDashboard, loading };
};
