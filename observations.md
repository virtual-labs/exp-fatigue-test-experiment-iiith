### What is Measured?

During the fatigue test, the following quantities are observed:

- Applied force
- Bending stress developed in the specimen
- Number of loading cycles to failure
- Logarithm of the number of cycles

These observations are used to study the fatigue behaviour of the material.

### Why are the Calculations Required?

The measured values are processed to

- determine the fatigue life,
- construct the S–N curve,
- understand the relationship between stress and fatigue life,
- compare fatigue performance under different loading conditions.

### Live Observation Table (During Simulation)

The simulation page continuously updates the following values:

| Number of Cycles (N) |     Force (N) |  Stress (MPa) |
| -------------------: | ------------: | ------------: |
|        Running value | Running value | Running value |

These values change as the specimen is subjected to cyclic loading.

### Completion Summary Table (After Failure)

After failure, the simulation summary page shows a complete trial-wise table generated from the same dataset used in the animation.

| Trial | Force (N) | Stress (MPa) | Cycles to Failure | log(N) | Result       |
| ----: | --------: | -----------: | ----------------: | -----: | :----------- |
|     1 |     140.0 |       295.40 |               133 |   4.89 | Intermediate |
|     2 |     130.0 |       275.50 |               176 |   5.17 | Intermediate |
|     3 |     120.0 |       253.60 |               200 |   5.30 | Intermediate |
|     4 |     110.0 |       233.60 |               280 |   5.63 | Intermediate |
|     5 |      94.5 |       199.40 |               350 |   5.86 | Intermediate |
|     6 |      86.6 |       182.80 |               380 |   5.94 | Intermediate |
|     7 |      83.9 |       177.00 |               444 |   6.10 | Intermediate |
|     8 |      76.4 |       121.00 |               876 |   6.78 | Intermediate |
|     9 |      67.9 |       112.80 |               907 |   6.81 | Intermediate |
|    10 |      72.4 |       117.30 |              1708 |   7.44 | Intermediate |
|    11 |      58.8 |       102.90 |              3000 |   8.01 | Intermediate |
|    12 |      46.1 |        86.66 |              6690 |   8.81 | Intermediate |
|    13 |      41.6 |        80.17 |              9750 |   9.18 | Intermediate |
|    14 |      39.4 |        76.68 |             15990 |   9.68 | Intermediate |
|    15 |      28.4 |        57.94 |             43560 |  10.68 | Intermediate |
|    16 |      37.1 |        73.07 |             60150 |  11.00 | Intermediate |
|    17 |      32.7 |        65.65 |             63300 |  11.06 | Intermediate |
|    18 |      19.8 |        41.41 |            141300 |  11.86 | Intermediate |
|    19 |      24.0 |        49.67 |            166560 |  12.02 | Failed       |

### Sequential Calculations

#### Step 1

Record the applied force.

#### Step 2

Determine the corresponding bending stress.

#### Step 3

Record the number of cycles at specimen failure.

#### Step 4

Calculate

$\log(N)$

#### Step 5

Plot the graph between **Stress (MPa)** and $\log(N)$ to study the fatigue behaviour.

### Solved Numerical Example

Given

Force

$$
F = 24\ \text{N}
$$

Stress

$$
S = 49.67\ \text{MPa}
$$

Cycles

$$
N = 166560
$$

Therefore,

$$
\log(N) = \log(166560) = 5.222
$$

For the summary graph, the plotted point for this final stage is

$$
(\log(N), S) = (5.222,\ 49.67)
$$

which is plotted on the S-N curve.

### Interpretation of Results

- Higher stress generally produces lower fatigue life.
- Lower stress generally increases the number of cycles to failure.
- The S–N curve is used to estimate the expected service life of engineering components subjected to cyclic loading.

### Result

The fatigue behaviour of the given specimen is studied by determining the relationship between applied stress and number of cycles to failure using the S-N curve representation shown in the simulation.
