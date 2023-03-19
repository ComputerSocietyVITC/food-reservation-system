const prisma = require("../../prisma/index");

// Creating a transaction

exports.createTransaction = async (details, response) => {
  // Details consists the key value pairs required to create the transaction

  for (let el of details.keys()) {
    if (details[el] == undefined) delete details[el];
  }
  try {
    let transaction = await prisma.transaction.create({
      data: {
        ...details,
      },
    });

    response.status(200).json({
      status: "success",
      transaction,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.getTransaction = async (id, response) => {
  // Controller to get the transaction using the id of the transaction
  try {
    let transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    response.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      error,
    });
  }
};

exports.updateTransaction = async (id, details, response) => {
  // Updating the transaction of the specified id with the key value pairs provided in the details object
  try {
    let transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        ...details,
      },
    });

    response.status(204).json({
      status: "success",
      transaction,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.deleteTransaction = async (id, response) => {
  // Controller for deleting the transaction of the specified id
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    response.status(204).json({
      status: "success",
    });
  } catch (error) {
    response.status(404).json({
      status: "failed",
      error,
    });
  }
};
