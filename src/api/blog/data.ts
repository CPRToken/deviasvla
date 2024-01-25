import type {Lawyer} from 'src/types/lawyer';
import { tokens } from 'src/locales/tokens';


export const firma = {


  title: tokens.form.firmaTitle as string,
  about:tokens.form.aboutFirm as string,

};

export const areas = {


  title: tokens.form.areasTitle as string,
  about:tokens.form.areasList as string,

};

export const lawyers: Lawyer[] = [

  {
    id: '1',
    name: 'Carlos Villarroel B.',
    email: 'cvillarroel@vla.cl',
    title: tokens.form.carlosTitle as string,
    cover: '/assets/team/villarroel.jpg',
    image: '/assets/team/villarroel.jpg',
    userurl: 'carlos-villarroel',
    bio: tokens.form.carlosBio as string, // Truncated for brevity
    intro: tokens.form.carlosIntro as string, // Truncated for brevity
    education: tokens.form.carlosEducation as string, // Truncated for brevity
    professional: tokens.form.carlosProfessionalAca as string, // Truncated for brevity
    publications: tokens.form.carlosPublications as string, // Truncated for brevity
    languages: tokens.form.carlosLanguages as string, // Truncated for brevity
  },

  {
    id: '2',
    name: 'Gabriel Villarroel B.',
    email: 'gvillarroel@vla.cl',
    title: tokens.form.gabrielTitle as string,
    cover: '/assets/team/villarroel-g.jpg',
    image: '/assets/team/villarroel-g.jpg',
    userurl: 'gabriel-villarroel',
    bio: tokens.form.gabrielBio as string, // Truncated for brevity
    intro: tokens.form.gabrielIntro as string, // Truncated for brevity
    education: tokens.form.gabrielEducation as string, // Truncated for brevity
    professional: tokens.form.gabrielProfessionalAca as string, // Truncated for brevity
    publications: tokens.form.gabrielPublications as string, // Truncated for brevity
    languages: tokens.form.gabrielLanguages as string, // Truncated for brevity
  },

  {
    id: '3',
    name: 'Raúl Lecaros Z.',
    email: 'raul.lecaros@vla.cl',
    title: tokens.form.raulTitle as string,
    cover: '/assets/team/raul-lecaros.jpg',
    image: '/assets/team/raul-lecaros.jpg',
    userurl: 'raul-lecaros',
    bio: tokens.form.raulBio as string, // Truncated for brevity
    intro: tokens.form.raulIntro as string, // Truncated for brevity
    education: tokens.form.raulEducation as string, // Truncated for brevity
    professional: tokens.form.raulProfessionalAca as string, // Truncated for brevity
    publications: tokens.form.raulPublications as string, // Truncated for brevity
    languages: tokens.form.raulLanguages as string, // Truncated for brevity
  },

  {
    id: '4',
    name: 'Christian Aste M',
    email: 'caste@vla.cl',
    title: tokens.form.christianTitle as string,
    cover: '/assets/team/aste.jpg',
    image: '/assets/team/aste.jpg',
    userurl: 'christian-aste',
    bio: tokens.form.christianBio as string, // Truncated for brevity
    intro: tokens.form.christianIntro as string, // Truncated for brevity
    education: tokens.form.christianEducation as string, // Truncated for brevity
    professional: tokens.form.christianProfessionalAca as string, // Truncated for brevity
    experience: tokens.form.christianExperiencePro as string, // Truncated for brevity
    publications:  tokens.form.christianPublications as string, // Truncated for brevity
    languages: tokens.form.christianLanguages as string, // Truncated for brevity
  },

  {
    id: '5',
    name: 'Juan Cristobal Jaramillo Charles',
    email: 'jcjaramillo@vla.cl',
    title: 'Abogado',
    cover: '/assets/team/juan-cristobal.jpg', // Placeholder
    image: '/assets/team/juan-cristobal.jpg', // Placeholder
    userurl: 'juan-cristobal-jaramillo',
    bio: 'Director de varias empresas. Inició su carrera profesional como abogado en Deloitte.',
    intro: 'Abogado Pontificia Universidad Católica de Chile.',
    education: 'Diplomado en Planificación y Gestión Tributaria, PUC (2007).',
    professional: 'Experiencia profesional: Emigró de Deloitte en 2005, asumiendo el área comercial de AVL Abogados en 2009.',
    publications: 'Publicaciones: Varios trabajos en tributación internacional.'
  },


  {
    id: '6',
    name: 'Carolina Langlois D.',
    email: 'clanglois@vla.cl',
    title: tokens.form.carolinaTitle as string, // Add title here
    cover: '/assets/team/langlois.jpg', // Placeholder
    image: '/assets/team/langlois.jpg', // Placeholder
    userurl: 'carolina-langlois',
    education: tokens.form.carolinaEducation as string, // 'Magíster en Derecho de la Empresa, PUC (1998).'
   experience: tokens.form.carolinaExperiencePro as string, // 'Experiencia profesional: Abogado Jefe y Gerente de RRHH Grupo CCF.'
    professional: tokens.form.carolinaProfessionalAca as string, // 'Actividad Académica: Profesor de Derecho del Trabajo, PUC.'
    publications: tokens.form.carolinaPublications as string, // 'Publicaciones: Varios artículos en Derecho del Trabajo.'
    languages: tokens.form.carolinaLanguages as string, // Add languages here
  },


// María Cecilia López G.
  {
    id: '7',
    name: 'María Cecilia López G.',
    email: 'mclopez@vla.cl',
    title: 'Abogado',
    cover: '/assets/team/maria-lopez.jpg', // Placeholder
    image: '/assets/team/maria-lopez.jpg', // Placeholder
    userurl: 'maria-lopez',
    bio: 'Publicaciones en la Revista Laboral Chilena.',
    intro: 'Educación: Licenciada en Derecho, PUC (1987).',
    education: 'Magíster de Derecho Laboral, Universidad Adolfo Ibáñez (2011).',
    professional: '',
    publications: 'Publicaciones: Varios artículos en Derecho Laboral.'
  },

// Jaime Valenzuela del V.
  {
    id: '8',
    name: 'Jaime Valenzuela del V.',
    email: 'jvalenzuela@vla.cl',
    title: 'Abogado',
    cover: '/assets/team/jaime-valenzuela.jpg', // Placeholder
    image: '/assets/team/jaime-valenzuela.jpg', // Placeholder
    userurl: 'jaime-valenzuela',
    bio: 'Asociación Latinoamericana de Hidrología Subterránea para el Desarrollo, ALHSUD.',
    intro: 'Educación: Centro de Estudios de Humanidades Clásicas, Salamanca, España (1985).',
    education: 'Universidad Adolfo Ibáñez, Magister en Dirección y Gestión Tributaria (2005).',
    professional: 'Actividad Académica: Profesor de Derecho de Aguas.',
    publications: 'Publicaciones: Varios artículos y libros en Derecho de Aguas.'
  },

// Claudio Verdugo B.
  {
    id: '9',
    name: 'Claudio Verdugo B.',
    email: 'cverdugo@vla.cl',
    title: 'Abogado',
    cover: '/assets/team/verdugo.jpg', // Placeholder
    image: '/assets/team/verdugo.jpg', // Placeholder
    userurl: 'claudio-verdugo',
    bio: 'Ponente en congresos nacionales e internacionales en Derecho Civil.',
    intro: 'Educación: Licenciado en Derecho, PUC (1992).',
    education: 'Premios: Premio Docente Destacado, PUC (2011).',
    professional: 'Actividad Académica: Profesor de Derecho Civil, PUC.',
    publications: 'Publicaciones: Diversos trabajos en Derecho Civil.'
  },

// Rafael del Valle V.
  {
    id: '10',
    name: 'Rafael del Valle V.',
    email: 'rdelvalle@vla.cl',
    title: 'Abogado',
    cover: '/assets/team/rafael-del-valle.jpg', // Placeholder
    image: '/assets/team/rafael-del-valle.jpg', // Placeholder
    userurl: '/rafael-del-valle',
    bio: 'Especialista en Derecho de Aguas y Recursos Naturales.',
    intro: 'Educación: Universidad de Chile (Licenciado en Derecho, 1987).',
    education: 'Universidad Adolfo Ibáñez, Magíster en Dirección y Gestión Tributaria (2005).',
    professional: 'Actividad Académica: Profesor de Derecho de Aguas.',
    publications: 'Publicaciones: Varios artículos en Derecho de Aguas y Medio Ambiente.'
  },

  {
    id: '11',
    name: 'Kyle Townley',
    email: 'kyle@vla.cl ',
    title: 'Abogado',
    cover: '/assets/team/kyle-townley.jpg', // Placeholder
    image: '/assets/team/kyle-townley.jpg',// Placeholder
    userurl: 'kyle-townley',
    bio: 'Especialista en Derecho de Aguas y Recursos Naturales.',
    intro: 'Educación: Universidad de Chile (Licenciado en Derecho, 1987).',
    education: 'Universidad Adolfo Ibáñez, Magíster en Dirección y Gestión Tributaria (2005).',
    professional: 'Actividad Académica: Profesor de Derecho de Aguas.',
    publications: 'Publicaciones: Varios artículos en Derecho de Aguas y Medio Ambiente.'
  },

  {
    id: '15',
    name: 'Francisco Micheli B.',
    email: 'fmicheli@vla.cl',
    title: tokens.form.franciscoTitle as string,
    cover: '/assets/team/francisco-micheli.jpg',
    image: '/assets/team/francisco-micheli.jpg',
    userurl: 'francisco-micheli-b',
    education: tokens.form.franciscoEducation as string, // Add education here
    professional: tokens.form.franciscoProfessionalAca as string, // Add professional experience here
    experience: tokens.form.franciscoExperiencePro as string, // Add professional experience here
   publications: tokens.form.franciscoPublications as string, // Add publications here
     languages: tokens.form.franciscoLanguages as string, // Add languages here
  },

  // Add more lawyers as needed
];


