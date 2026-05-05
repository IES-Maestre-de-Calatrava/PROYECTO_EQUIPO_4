export function formatearFecha(fechaStr) {
    if (!fechaStr) return "N/A";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString();
}
