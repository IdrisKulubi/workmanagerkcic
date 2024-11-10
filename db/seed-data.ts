interface Opportunity {
  id: string;
  projectName: string;
  projectTeam: string;
  action: string;
  actionDeadline: string | null;
  submissionDeadline: string | null;
  weekOf: string;
  status: string;
  department: string;
}

export const opportunitiesData: Opportunity[] = [
  // Week of 28/10/2024
  {
    id: "opp_1",
    projectName: "SHA Launch event",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_2", 
    projectName: "GRI",
    projectTeam: "Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "SAS"
  },
  {
    id: "opp_3",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_4",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_5",
    projectName: "TMA Project",
    projectTeam: "Alphonce/Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_6",
    projectName: "Educate",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_7",
    projectName: "Fossil Fuel",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_8",
    projectName: "SHA",
    projectTeam: "Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_9",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_10",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_11",
    projectName: "Mace foods",
    projectTeam: "Paul/Kelvin/Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-10-31",
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_12",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_13",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_14",
    projectName: "Articles",
    projectTeam: "Kelvin & Anne, Josephine & Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-28",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_15",
    projectName: "GRI",
    projectTeam: "Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_16", 
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_17",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_18",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_19",
    projectName: "Educate",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_20",
    projectName: "Fossil Fuel",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_21",
    projectName: "SHA",
    projectTeam: "Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_22",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_23",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_24",
    projectName: "Mace foods",
    projectTeam: "Paul/Kelvin/Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-10-31",
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_25", 
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_26",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update", 
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_27",
    projectName: "Articles",
    projectTeam: "Kelvin & Anne, Josephine & Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress", 
    department: "PSD"
  },
  {
    id: "opp_28",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-22",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 14/01/2024
  {
    id: "opp_29",
    projectName: "GRI",
    projectTeam: "Anne", 
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_30",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-01-14", 
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_31",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_32",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_33",
    projectName: "SHA",
    projectTeam: "Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_34",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_35",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_36",
    projectName: "Mace foods",
    projectTeam: "Paul/Kelvin/Josephine",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_37",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_38",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-01-14",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 07/10/2024
  {
    id: "opp_39",
    projectName: "Zela",
    projectTeam: "Vanam/Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_40",
    projectName: "ICR",
    projectTeam: "Lisbeth", 
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_41",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_42",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_43",
    projectName: "SHA",
    projectTeam: "Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_44",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_45",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_46",
    projectName: "Mace foods",
    projectTeam: "Paul/Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_47",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_48",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-10-07",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 30/09/2024
  {
    id: "opp_49",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_50",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_51",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_52",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_53",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_54",
    projectName: "Shamba Pride",
    projectTeam: "Anne",
    action: "Update on the kick off meeting",
    actionDeadline: null,
    submissionDeadline: "2024-10-09",
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_55",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_56",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-30",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 23/09/2024
  {
    id: "opp_57",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_58",
    projectName: "TMA Project", 
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_59",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_60",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-08-23",
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_61",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_62",
    projectName: "Shamba Pride",
    projectTeam: "Anne",
    action: "Update on the kick off meeting",
    actionDeadline: null,
    submissionDeadline: "2024-10-09",
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_63",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_64",
    projectName: "Climate and Health",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_65",
    projectName: "Articles",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_66",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-23",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 16/09/2024
  {
    id: "opp_67",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_68",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_69",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_70",
    projectName: "GRI",
    projectTeam: "Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_71",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-08-23",
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_72",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_73",
    projectName: "Shamba Pride",
    projectTeam: "Anne",
    action: "Update on the kick off meeting",
    actionDeadline: null,
    submissionDeadline: "2024-10-09",
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_74",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_75",
    projectName: "Climate and Health",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_76",
    projectName: "Articles",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_77",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-16",
    status: "In Progress",
    department: "PSD"
  },
  // Week of 09/09/2024
  {
    id: "opp_78",
    projectName: "DCA Meeting",
    projectTeam: "Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-09-09",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_79",
    projectName: "Youth Adapt",
    projectTeam: "Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_80",
    projectName: "TMA Project",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-11-30",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_81",
    projectName: "SUED",
    projectTeam: "Kelvin/Vanam",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_82",
    projectName: "GRI",
    projectTeam: "Anne",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_83",
    projectName: "ICR",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: "2024-08-23",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_84",
    projectName: "IFC",
    projectTeam: "Kelvin",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_85",
    projectName: "Shamba Pride",
    projectTeam: "Anne",
    action: "Update on the kick off meeting",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_86",
    projectName: "VSO training",
    projectTeam: "Josephine/Anita",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_87",
    projectName: "Climate and Health",
    projectTeam: "Alphonce",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_88",
    projectName: "PSD Strategy Presentation",
    projectTeam: "Team",
    action: "Presentation",
    actionDeadline: "2024-09-02",
    submissionDeadline: "2024-09-16",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_89",
    projectName: "TA Strategy Presentation",
    projectTeam: "Team",
    action: "Presentation",
    actionDeadline: "2024-09-02",
    submissionDeadline: "2024-09-16",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_90",
    projectName: "SAS Strategy Presentation",
    projectTeam: "Team",
    action: "Presentation",
    actionDeadline: "2024-09-02",
    submissionDeadline: "2024-09-16",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_91",
    projectName: "Comms Strategy Presentation",
    projectTeam: "Team",
    action: "Presentation",
    actionDeadline: "2024-09-02",
    submissionDeadline: "2024-09-16",
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_92",
    projectName: "Articles",
    projectTeam: "Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  },
  {
    id: "opp_93",
    projectName: "Daily Comms",
    projectTeam: "Clement/Lisbeth",
    action: "Update",
    actionDeadline: null,
    submissionDeadline: null,
    weekOf: "2024-09-09",
    status: "In Progress",
    department: "PSD"
  }
];