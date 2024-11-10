import db from "./drizzle";
import { events } from "./schema";
import { opportunitiesData } from "./seed-data";

async function seed() {
  try {
    // Clear existing data
    await db.delete(events);

    // Insert new opportunities
    await db.insert(events).values(
      opportunitiesData.map(opp => ({
        id: opp.id,
        opportunity: opp.projectName,
        projectTeam: opp.projectTeam,
        action: opp.action,
        actionDeadline: opp.actionDeadline ? opp.actionDeadline : null,
        submissionDeadline: opp.submissionDeadline ? opp.submissionDeadline : null,
        weekOf: opp.weekOf,
        status: opp.status,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  }); 