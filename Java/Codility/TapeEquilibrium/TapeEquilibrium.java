/**
 * TapeEquilibrium class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/3-time_complexity/tape_equilibrium/">https://app.codility.com/programmers/lessons/3-time_complexity/tape_equilibrium/</a>
 */
public class TapeEquilibrium {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.print(TapeEquilibrium.solution(new int[]{2, 3, 1, 5}));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * @param A array with values
     * @return minimal difference between tape parts
     */
    public static int solution(int[] A) {
        int minimumValue = Integer.MAX_VALUE;
        int sumOfArray = 0;
        for (int i = 0; i < A.length; i++) {
            sumOfArray += A[i];
        }
        int sumOfPreviousCut = 0;
        int sumOfForwardCut = sumOfArray;
        for (int i = 0; i < A.length; i++) {
            sumOfPreviousCut = sumOfPreviousCut + A[i];
            sumOfForwardCut = sumOfForwardCut - A[i];
            int value = Math.abs(sumOfPreviousCut - sumOfForwardCut);
            if (value < minimumValue) {
                minimumValue = value;
            }
        }
        return minimumValue;
    }
}
