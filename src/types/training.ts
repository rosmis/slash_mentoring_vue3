export interface Training {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      duration: string;
      date: Date;
      zoom_link: string;
      trainer: Trainer;
    };
  };
}

export interface Trainer {
  data: {
    id: string;
    attributes: {
      firstName: string;
      lastName: string;
      profilePicture: string;
      educationLevel: string;
    };
  };
}
