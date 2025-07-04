import {
  getSales,
  getSalesById,
  getSalesWithTotalAmount,
  getSalesByCustomerEmail,
  postUpdateCouponValue,
  getTopProductsBySales,
} from "../services/salesService.js";

export const getAllSales = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSales(page, pageSize);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSaleById = async (req, res) => {
  const id = req.params.id;

  try {
    const sale = await getSalesById(id);

    if (!sale) {
      return res.status(404).json({ message: "No se encontró la venta" });
    }

    res.json(sale);
  } catch (error) {
    console.log("Error obteniendo venta: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalAmountSales = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSalesWithTotalAmount(page, pageSize);

    res.json(sales);
  } catch (error) {
    console.log("Error monto total de ventas: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCouponValue = async (req, res) => {
  const id = req.params.id;
  const newValue = req.query.newValue;

  try {
    const updatedRows = postUpdateCouponValue(id, newValue);

    if (!updatedRows) {
      return res.status(500).json({ message: "No se pudo actualizar cupon" });
    }

    res.json({ message: "Cupón actualizado correctamente" });
  } catch (error) {
    console.log("Error actualizando cupón: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSalesByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const sales = await getSalesByCustomerEmail(email);

    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: "No se encontraron ventas" });
    }

    res.json(sales);
  } catch (error) {
    console.log("Error obteniendo ventas por email: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const topProductBySales = async (req, res) => {
  const cantTop = parseInt(req.query.limit);
  //console.log("cantTop: ", cantTop);

  try {
    const topProducts = await getTopProductsBySales(cantTop);

    if (!topProducts || topProducts.length === 0) {
      return res.status(404).json({ message: "No se encontraron prodctos" });
    }

    res.json(topProducts);
  } catch (error) {
    console.log("Error obteniendo top de productos: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
