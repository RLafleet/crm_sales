-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'thinking', 'warm', 'hot', 'call_later', 'revisit', 'not_relevant', 'refused', 'connected');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "WarmnessLevel" AS ENUM ('cold', 'warm', 'hot');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('door', 'call', 'telegram', 'whatsapp');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('call', 'revisit', 'message');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('open', 'done', 'skipped');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "entrance" TEXT,
    "floor" TEXT,
    "apartment" TEXT,
    "currentOperator" TEXT,
    "usesHomeInternet" BOOLEAN NOT NULL DEFAULT false,
    "usesMobile" BOOLEAN NOT NULL DEFAULT false,
    "usesTV" BOOLEAN NOT NULL DEFAULT false,
    "currentMonthlyPrice" INTEGER,
    "connectionType" TEXT,
    "hasSmartTV" BOOLEAN NOT NULL DEFAULT false,
    "needsSetTopBox" BOOLEAN NOT NULL DEFAULT false,
    "householdSize" INTEGER,
    "numberPortabilityImportant" BOOLEAN NOT NULL DEFAULT false,
    "familyPlanPotential" BOOLEAN NOT NULL DEFAULT false,
    "decisionMaker" TEXT,
    "leadStatus" "LeadStatus" NOT NULL DEFAULT 'new',
    "leadPriority" "LeadPriority" NOT NULL DEFAULT 'medium',
    "warmnessLevel" "WarmnessLevel" NOT NULL DEFAULT 'cold',
    "preferredCallTime" TEXT,
    "nextFollowUpAt" TIMESTAMP(3),
    "revisitNeeded" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastContactAt" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactHistory" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contactType" "ContactType" NOT NULL,
    "result" TEXT,
    "notes" TEXT,
    "nextActionAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpTask" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'open',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUpTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");

-- AddForeignKey
ALTER TABLE "ContactHistory" ADD CONSTRAINT "ContactHistory_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpTask" ADD CONSTRAINT "FollowUpTask_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
