var myTree = {
  pedigree: {
    data: {
      name: "Me",
      gender: "male"
    },
    spouses: [
      {
        data: {
          name: "S1",
          gender: "female"
        },
        children: [
          {
            data: {
              name: "Child 1",
              gender: "male"
            }
          },
          {
            data: {
              name: "Child 2",
              gender: "male"
            }
          }
        ]
      }
    ]
  },
  siblings1: [
    {
      data: {
        name: "Brother 1",
        gender: "male"
      },
      spouses: [
        {
          data: {
            name: "Brother 1s spouse",
            gender: "female"
          },
          children: [
            {
              data: {
                name: "Brother 1s daughter 1",
                gender: "female"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Brother 2",
        gender: "male"
      },
      spouses: [
        {
          data: {
            name: "S2",
            gender: "female"
          },
          children: [
            {
              data: {
                name: "Brother 2s daughter 1",
                gender: "female"
              }
            },
            {
              data: {
                name: "Brother 2s daughter 2",
                gender: "female"
              }
            },
            {
              data: {
                name: "Brother 2s son",
                gender: "male"
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
        name: "1 Aunt 1",
        gender: "female"
      },
      spouses: [
        {
          data: {
            name: "S3",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "1 Aunt 1s son 1",
                gender: "male"
              }
            },
            {
              data: {
                name: "1 Aunt 1s son 2",
                gender: "male"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "1 Aunt 2",
        gender: "female"
      },
      spouses: [
        {
          data: {
            name: "S4",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "1 Aunt 2s son 1",
                gender: "male"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 2",
                gender: "male"
              }
            },
            {
              data: {
                name: "1 Aunt 2s son 3",
                gender: "male"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "1 Aunt 2s daughter",
                gender: "female"
              }
            }
          ]
        },
        {
          data: {
            name: "S4a",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "a1 Aunt 2s son 1",
                gender: "male"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 2",
                gender: "male"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s son 3",
                gender: "male"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "a1 Aunt 2s daughter",
                gender: "female"
              }
            }
          ]
        },
        {
          data: {
            name: "S4b",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "b1 Aunt 2s son 1",
                gender: "male"
              }
            }
          ]
        },
        {
          data: {
            name: "S4c",
            gender: "male"
          }
        }
      ]
    },
    /*{
      data: {
        name: "Aunt 1",
        gender: "female"
      },
      spouses: [
        {
          data: {
            name: "S5",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "Aunt 1s son 1",
                gender: "male"
              },
              spouses: [
                {
                  data: {
                    name: "S6",
                    gender: "female"
                  },
                  children: [
                    {
                      data: {
                        name: "Aunt 1s son 1s son",
                        gender: "male"
                      },
                      spouses: [
                        {
                          data: {
                            name: "Aunt 1s son 1s sons spouse",
                            gender: "female"
                          },
                          children: [
                            {
                              data: {
                                name: "Aunt 1s son 1s sons son",
                                gender: "male"
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
                name: "Aunt 1s son 2",
                gender: "male"
              }
            }
          ]
        }
      ]
    }*/
  ],
  father_siblings: [
    {
      data: {
        name: "Aunt 0",
        gender: "female"
      }
    },
    {
      data: {
        name: "Aunt 1",
        gender: "female"
      },
      spouses: [
        {
          data: {
            name: "S5",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "Aunt 1s son 1",
                gender: "male"
              },
              spouses: [
                {
                  data: {
                    name: "S6",
                    gender: "female"
                  },
                  children: [
                    {
                      data: {
                        name: "Aunt 1s son 1s son",
                        gender: "male"
                      },
                      spouses: [
                        {
                          data: {
                            name: "Aunt 1s son 1s sons spouse",
                            gender: "female"
                          },
                          children: [
                            {
                              data: {
                                name: "Aunt 1s son 1s sons son",
                                gender: "male"
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
                name: "Aunt 1s son 2",
                gender: "male"
              }
            }
          ]
        }
      ]
    },
    {
      data: {
        name: "Aunt 2",
        gender: "female"
      },
      spouses: [
        {
          data: {
            name: "S7",
            gender: "male"
          },
          children: [
            {
              data: {
                name: "Aunt 2s son",
                gender: "male"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "Aunt 2s son",
                gender: "male"
              }
            },
            {
              data: {
                name: "Aunt 2s son",
                gender: "male"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female"
              }
            },
            {
              data: {
                name: "Aunt 2s daughter",
                gender: "female"
              }
            }
          ]
        }
      ]
    }
  ],
  father: {
    data: {
      name: "Father",
      gender: "male"
    }
  },
  mother: {
    data: {
      name: "Mother",
      gender: "female"
    },
    father: {
      data: {
        name: "Grandfather",
        gender: "male"
      },
      father: {
        data: {
          name: "Great-grandfather",
          gender: "male"
        }
      },
      mother: {
        data: {
          name: "Great-grandmother",
          gender: "female"
        }
      }
    },
    mother: {
      data: {
        name: "Grandmother",
        gender: "female"
      },
      father: {
        data: {
          name: "Great-grandfather",
          gender: "male"
        }
      },
      mother: {
        data: {
          name: "Great-grandmother",
          gender: "female"
        }
      }
    }
  }
};