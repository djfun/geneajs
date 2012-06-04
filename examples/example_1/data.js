var myTree = {
  pedigree: {
    data: {
      name: "Me",
    },
    children: [
      {
        data: {
          name: "Child 1"
        }
      },
      {
        data: {
          name: "Child 2"
        }
      },
    ],
  },
  siblings2: [
    {
      data: {
        name: "Brother 1"
      }
    },
    {
      data: {
        name: "Brother 2"
      },
      children: [
        {
          data: {
            name: "Brother 2s daughter 1"
          }
        },
        {
          data: {
            name: "Brother 2s daughter 2"
          }
        },
        {
          data: {
            name: "Brother 2s son"
          }
        }
      ]
    },
  ],
  father_siblings: [
    {
      data: {
        name: "Aunt 1"
      },
      children: [
        {
          data: {
            name: "Aunt 1s son 1"
          }
        },
        {
          data: {
            name: "Aunt 1s son 2"
          }
        },
      ]
    },
    {
      data: {
        name: "Aunt 2"
      },
      children: [
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
      ]
    },
  ],
  mother_siblings: [
    {
      data: {
        name: "Aunt 1"
      },
      children: [
        {
          data: {
            name: "Aunt 1s son 1"
          }
        },
        {
          data: {
            name: "Aunt 1s son 2"
          }
        },
      ]
    },
    {
      data: {
        name: "Aunt 2"
      },
      children: [
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s son"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
        {
          data: {
            name: "Aunt 2s daughter"
          }
        },
      ]
    },
  ],
  father: {
    data: {
      name: "Father"
    }
  },
  mother: {
    data: {
      name: "Mother"
    },
    father: {
      data: {
        name: "Grandfather"
      },
      father: {
        data: {
          name: "Great-grandfather"
        },
      },
      mother: {
        data: {
          name: "Great-grandmother"
        }
      }
    },
    mother: {
      data: {
        name: "Grandmother"
      },
      father: {
        data: {
          name: "Great-grandfather"
        },
      },
      mother: {
        data: {
          name: "Great-grandmother"
        }
      }
    },
  },
};