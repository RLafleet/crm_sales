import {
  PrismaClient,
  LeadStatus,
  LeadPriority,
  WarmnessLevel,
  ContactType,
  TaskType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.followUpTask.deleteMany();
  await prisma.contactHistory.deleteMany();
  await prisma.client.deleteMany();

  await prisma.client.createMany({
    data: [
      {
        fullName: 'Иван Петров',
        phone: '+79990000001',
        address: 'Москва, ул. Пушкина, д. 10',
        entrance: '2',
        floor: '5',
        apartment: '45',
        currentOperator: 'Rostelecom',
        usesHomeInternet: true,
        usesTV: true,
        currentMonthlyPrice: 950,
        connectionType: 'GPON',
        hasSmartTV: true,
        needsSetTopBox: false,
        householdSize: 3,
        numberPortabilityImportant: true,
        familyPlanPotential: true,
        decisionMaker: 'Иван',
        leadStatus: LeadStatus.warm,
        leadPriority: LeadPriority.high,
        warmnessLevel: WarmnessLevel.warm,
        preferredCallTime: '18:00-20:00',
        nextFollowUpAt: new Date(Date.now() + 24 * 3600 * 1000),
        revisitNeeded: false,
        notes: 'Ждёт окончания договора',
        lastContactAt: new Date(),
      },
      {
        fullName: 'Светлана Орлова',
        phone: '+79990000002',
        address: 'Москва, пр-т Ленина, д. 5',
        usesHomeInternet: false,
        usesMobile: true,
        currentOperator: 'MTS',
        leadStatus: LeadStatus.new,
        leadPriority: LeadPriority.medium,
        warmnessLevel: WarmnessLevel.cold,
      },
    ],
  });

  const client = await prisma.client.findFirst({ where: { phone: '+79990000001' } });

  if (client) {
    await prisma.contactHistory.create({
      data: {
        clientId: client.id,
        contactType: ContactType.call,
        result: 'Пообщались, ждёт предложение',
        notes: 'Нужен пакет интернет+ТВ',
        nextActionAt: new Date(Date.now() + 2 * 24 * 3600 * 1000),
      },
    });

    await prisma.followUpTask.create({
      data: {
        clientId: client.id,
        type: TaskType.call,
        dueAt: new Date(Date.now() + 2 * 24 * 3600 * 1000),
        notes: 'Перезвонить с тарифами',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
