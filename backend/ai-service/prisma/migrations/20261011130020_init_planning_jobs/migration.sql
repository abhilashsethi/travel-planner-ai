-- CreateEnum
CREATE TYPE "PlanningStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "PlanningJob" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanningJob_eventId_key" ON "PlanningJob"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningJob_tripId_key" ON "PlanningJob"("tripId");

-- CreateIndex
CREATE INDEX "PlanningJob_status_createdAt_idx" ON "PlanningJob"("status", "createdAt");
