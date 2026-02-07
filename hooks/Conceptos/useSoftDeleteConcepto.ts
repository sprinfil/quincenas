import { db } from "@/db/database";

export const useSoftDeleteConcepto = () => {
  const softDeleteConcepto = (
    id: number | string | null | undefined
  ): boolean => {
    if (!id) return false;

    const now = new Date().toISOString();

    db.execSync(`
      UPDATE conceptos
      SET deleted_at = '${now}'
      WHERE id = ${Number(id)} AND deleted_at IS NULL
    `);

    return true;
  };

  return { softDeleteConcepto };
};
