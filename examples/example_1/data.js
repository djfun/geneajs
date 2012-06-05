var myTree = {
  pedigree: {
    data: {
      name: "Me"
    },
    spouses: [
      {
        data: {
          name: "S1"
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
          }
        ]
      }
    ]
  },
  siblings2: [
    {
      data: {
        name: "Brother 1"
      },
      spouses: [
        {
          data: {
            name: "Brother 1s spouse"
          },
          children: [
            {
              data: {
                name: "Brother 1s daughter 1"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Brother 2"
      },
      spouses: [
        {
          data: {
            name: "S2"
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
        }
      ]
    }
  ],
  father_siblings: [
    {
      data: {
        name: "1 Aunt 1"
      },
      spouses: [
        {
          data: {
            name: "S3"
          },
          children: [
            {
              data: {
                name: "1 Aunt 1s son 1"
              }
            },
            {
              data: {
                name: "1 Aunt 1s son 2"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "1 Aunt 2"
      },
      spouses: [
        {
          data: {
            name: "S4"
          },
          children: [
            {
              data: {
                name: "1 Aunt 2s son 1"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 2"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 3"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter"
              }
            }
          ]
        },
        {
          data: {
            name: "S4a"
          },
          children: [
            {
              data: {
                name: "a1 Aunt 2s son 1"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 2"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 3"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter"
              }
            }
          ]
        }
      ]
    }
  ],
  mother_siblings: [
    {
      data: {
        name: "Aunt 1"
      },
      spouses: [
        {
          data: {
            name: "S5"
          },
          children: [
            {
              data: {
                name: "Aunt 1s son 1"
              },
              spouses: [
                {
                  data: {
                    name: "S6"
                  },
                  children: [
                    {
                      data: {
                        name: "Aunt 1s son 1s son"
                      },
                      spouses: [
                        {
                          data: {
                            name: "Aunt 1s son 1s sons spouse"
                          },
                          children: [
                            {
                              data: {
                                name: "Aunt 1s son 1s sons son"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              data: {
                name: "Aunt 1s son 2"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Aunt 2"
      },
      spouses: [
        {
          data: {
            name: "S7"
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
            }
          ]
        }
      ]
    }
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
        }
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
        }
      },
      mother: {
        data: {
          name: "Great-grandmother"
        }
      }
    }
  }
};