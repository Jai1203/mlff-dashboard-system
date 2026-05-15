const pool = require("../config/db");

exports.addStats = async (req, res) => {

  try {

    const data = req.body;

    const result = await pool.query(
      `
      INSERT INTO transaction_stats (

        plaza_id,
        plaza_name,
        time_period_type,

        start_date,
        end_date,

        total_txn_count,
        total_txn_amount,

        clean_txn_count,
        clean_txn_amount,

        enotice_txn_count,
        enotice_txn_amount,

        inprogress_txn_count,
        inprogress_txn_amount,

        dispute_txn_count,
        dispute_txn_amount

      )

      VALUES (

        $1,$2,$3,$4,$5,
        $6,$7,
        $8,$9,
        $10,$11,
        $12,$13,
        $14,$15

      )

      RETURNING *

      `,
      [

        data.plaza_id,
        data.plaza_name,
        data.time_period_type,

        data.start_date,
        data.end_date,

        data.stats.total_txn.count,
        data.stats.total_txn.amount,

        data.stats.clean_txn.count,
        data.stats.clean_txn.amount,

        data.stats.enotice_txn.count,
        data.stats.enotice_txn.amount,

        data.stats.inprogress_txn.count,
        data.stats.inprogress_txn.amount,

        data.stats.dispute_txn.count,
        data.stats.dispute_txn.amount

      ]
    );

    res.status(201).json({
      message: "Transaction stats added successfully",
      data: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};

exports.getStats = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM transaction_stats
      ORDER BY created_at DESC
      `
    );

    res.status(200).json(result.rows);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};