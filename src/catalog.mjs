export const company = {
  name: 'Samcon Industrial Controls Pvt. Ltd.',
  email: 'marketing@samcon.co.in',
  location: 'Asangaon, Maharashtra, India',
  website: 'https://www.samconcontrolpanel.com/',
  contact: 'https://www.samconcontrolpanel.com/contact.php',
  gallery: 'https://www.samconcontrolpanel.com/gallery-control-panels.php',
  projects: 'https://www.samconcontrolpanel.com/projects.php',
};

export const groups = [
  { id: 'power-distribution', name: 'Power distribution', summary: 'Main switchboards, outgoing distribution and power factor correction.' },
  { id: 'motor-control', name: 'Motor control', summary: 'Withdrawable feeders and intelligent motor protection.' },
  { id: 'application-specific', name: 'Application-specific', summary: 'Controls for solar, HVAC, outdoor installations and generators.' },
];

export const products = [
  {
    slug: 'pcc-mcc', group: 'power-distribution', name: 'PCC / MCC',
    title: 'Power and motor control centres',
    summary: 'Modular switchboards for distributing power and managing motor feeders in industrial and building projects.',
    alt: 'Four grey switchgear bays with incoming controls and stacked motor feeder compartments',
    source: 'https://samconcontrolpanel.com/pcc-mcc.php',
    specs: [['Configurations', 'PCC and MCC'], ['Construction', 'Modular sheet steel'], ['Cable entry', 'Top or bottom options'], ['Busbar', 'Copper or aluminium options']],
    sections: [
      ['Power Control Centre', 'Centralise incoming power and distribution to downstream circuits and equipment. Discuss the incomer, outgoing feeders and proposed cable route with Samcon.'],
      ['Motor Control Centre', 'Group motor starters and their controls in a modular assembly. Define the motor schedule, control sequence and protection requirements for the application.'],
      ['Project drawings', 'Samcon describes a project documentation set covering the general arrangement, single-line diagram and bill of materials. Confirm the drawing and test requirements with the engineering team.'],
    ],
  },
  {
    slug: 'distribution-boards', group: 'power-distribution', name: 'Distribution Boards',
    title: 'Distribution boards',
    summary: 'Enclosed cubicle boards for distributing power to outgoing circuits in industrial facilities and buildings.',
    alt: 'Compact two-section grey enclosure with a stack of feeder doors and a cable compartment',
    source: 'https://samconcontrolpanel.com/distribution-board.php',
    specs: [['Application', 'Downstream distribution'], ['Construction', 'Enclosed modular cubicle'], ['Access', 'Front access options'], ['Cable entry', 'Top or bottom options']],
    sections: [
      ['Outgoing circuits', 'Define the load schedule and outgoing circuits so the board layout can be coordinated with the application.'],
      ['Service access', 'Discuss space for switchgear, metering, busbars and cable termination. Confirm the approach to access and cable entry during layout review.'],
    ],
  },
  {
    slug: 'apfcr-panels', group: 'power-distribution', name: 'APFCR Panels',
    title: 'Automatic power factor correction panels',
    summary: 'Automatic capacitor switching to manage reactive power as facility loads change.',
    alt: 'Open ventilation cabinet containing two organised rows of cylindrical capacitors',
    source: 'https://samconcontrolpanel.com/apfcr-panel.php',
    specs: [['Application', 'Power factor correction'], ['Switching options', 'Contactor or thyristor'], ['Equipment', 'Capacitor banks'], ['Enclosure', 'Ventilation for capacitor banks']],
    sections: [
      ['Reactive power compensation', 'The controller selects capacitor stages as the electrical load changes. Share the load profile and correction objective when requesting a configuration.'],
      ['Switching configuration', 'Samcon lists contactor-based and thyristor-switched designs. Confirm the switching arrangement and ventilation for the proposed duty.'],
    ],
  },
  {
    slug: 'drawout-panels', group: 'motor-control', name: 'Drawout Panels',
    title: 'Drawout panels',
    summary: 'Modular panels with withdrawable feeder units for inspection and service access.',
    alt: 'Two switchgear bays with rows of modular feeder drawers, one partially withdrawn',
    source: 'https://samconcontrolpanel.com/drawout-panels.php',
    specs: [['Application', 'Withdrawable feeders'], ['Layout', 'Modular feeder compartments'], ['Access', 'Withdrawable units'], ['Configuration', 'Project-specific feeder mix']],
    sections: [
      ['Withdrawable compartments', 'Individual feeder units sit in modular compartments. Discuss drawer access, service clearance and the mix of feeders needed for the project.'],
      ['Assembly options', 'Samcon documents multiple feeder and incomer arrangements. Confirm module sizes, enclosure layout and the applicable test evidence for the configuration.'],
    ],
  },
  {
    slug: 'intelligent-motor-control-center', group: 'motor-control', name: 'Intelligent MCC',
    title: 'Intelligent motor control centre',
    summary: 'Motor control with operating data, electronic protection and fault diagnostics for monitored systems.',
    alt: 'Two-bay motor control enclosure with a compact operator display above modular starters',
    source: 'https://samconcontrolpanel.com/intelligent-mcc-panel.php',
    specs: [['Application', 'Monitored motor control'], ['Protection', 'Electronic motor protection'], ['Operating data', 'Load and event information'], ['Diagnostics', 'Fault and trip information']],
    sections: [
      ['Monitor motor performance', 'Use available operating data to review motor loads and start, stop or trip events. Discuss the points operators need to see and how those signals should be presented.'],
      ['Project integration', 'Provide a motor schedule, control requirements and integration expectations. Confirm the protection and communication options for your project.'],
    ],
  },
  {
    slug: 'solar-panels', group: 'application-specific', name: 'Solar Distribution Panels',
    title: 'Solar distribution panels',
    summary: 'AC and DC distribution enclosures for solar photovoltaic projects.',
    alt: 'Two compact electrical distribution enclosures with visible breakers in the larger open enclosure',
    source: 'https://samconcontrolpanel.com/solar-panel.php',
    specs: [['Application', 'Solar PV distribution'], ['Configurations', 'ACDB and DCDB'], ['Functions', 'Distribution and isolation'], ['Protection', 'Project-specific arrangement']],
    sections: [
      ['AC distribution box', 'Coordinate AC-side distribution, isolation and protection with the inverter and downstream system.'],
      ['DC distribution box', 'Define the DC inputs and protection requirements from the project design. Samcon describes DC enclosures configured for the plant and its installation conditions.'],
    ],
  },
  {
    slug: 'ahu-panels', group: 'application-specific', name: 'AHU Panels',
    title: 'Air handling unit control panels',
    summary: 'Control panels for air handling unit fans, interlocks and building management integration.',
    alt: 'Compact wall-mounted steel enclosure with an operator interface and three controls',
    source: 'https://samconcontrolpanel.com/ahu-panel.php',
    specs: [['Application', 'HVAC air handling'], ['Functions', 'Fan control and interlocks'], ['Integration', 'BMS options'], ['Drive control', 'VFD options']],
    sections: [
      ['Air handling controls', 'Coordinate fan starters, damper interlocks and the project control sequence. Share the air handling unit schedule when requesting a panel.'],
      ['Building management', 'Discuss remote operation, BMS points and optional variable-frequency drive control for the installation.'],
    ],
  },
  {
    slug: 'outdoor-panels', group: 'application-specific', name: 'Outdoor Panels',
    title: 'Outdoor control panels',
    summary: 'Enclosed control and distribution assemblies configured for outdoor installations.',
    alt: 'Outdoor electrical cabinet with a broad rain canopy, closed doors and a raised plinth',
    source: 'https://www.samconcontrolpanel.com/gallery-control-panels.php',
    specs: [['Application', 'Outdoor installations'], ['Construction', 'Enclosed cabinet'], ['Layout', 'Project-specific compartments'], ['Site inputs', 'Exposure and service access']],
    sections: [
      ['Outdoor installation', 'Share the installation exposure, ambient conditions and electrical layout. Confirm the required enclosure protection and equipment access for the site.'],
      ['Configuration examples', 'Samcon’s gallery includes outdoor drawout and motor control assemblies. Use the gallery to explore reference builds when discussing a new configuration.'],
    ],
  },
  {
    slug: 'dg-synchronize-panels', group: 'application-specific', name: 'DG Synchronize Panels',
    title: 'Diesel generator synchronisation panels',
    summary: 'Panels for coordinating diesel generator sets in parallel and managing shared electrical loads.',
    alt: 'Two adjoining generator control sections with paired meters and controller modules',
    source: 'https://www.samconcontrolpanel.com/DG-synchronize-panel.php',
    specs: [['Application', 'Diesel generator systems'], ['Operation', 'Parallel generator operation'], ['Control', 'Synchronisation and load sharing'], ['Options', 'Project-specific automation']],
    sections: [
      ['Parallel operation', 'Coordinate multiple diesel generator sets and the load they supply. Share the generator schedule and desired operating modes with Samcon.'],
      ['Project control sequence', 'Discuss automatic mains failure, generator starting and load management where they form part of the project.'],
    ],
  },
];

export const resources = [
  { title: 'Samcon TTA brochure', line: 'Type-tested assembly brochure', url: 'https://www.sme.in/samconicpl/pdf/Samcon_TTA_Brochure.pdf' },
  { title: 'Samcon L&T Ti brochure', line: 'L&T Ti switchboard brochure', url: 'https://www.sme.in/samconicpl/pdf/Samcon_LT_TI_BROCHURE.pdf' },
  { title: 'Panel installation manual', line: 'Installation and handling reference', url: 'https://www.samconcontrolpanel.com/pdf/Installation-Manual-Method.pdf' },
];
