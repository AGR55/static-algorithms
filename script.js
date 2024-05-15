$(document).ready(function(){
    var navBar = $(".nav-bar");
    var originalHeight = navBar.height();  // Guarda la altura original de la barra de navegación
  
    navBar.height(0);  // Establece la altura inicial de la barra de navegación a 0
  
    $(".fa-bars-staggered").click(function(event){
      event.stopPropagation();  // Evita que el evento de clic se propague al documento
      if (navBar.height() === 0) {
        navBar.height(originalHeight);  // Usa la altura original para mostrar la barra de navegación
      } else {
        navBar.height(0);  // Establece la altura a 0 para ocultar la barra de navegación
      }
    });
  
    $(document).click(function() {
      navBar.height(0);  // Establece la altura a 0 para ocultar la barra de navegación cuando se hace clic fuera
    });
  
    navBar.click(function(event){
      event.stopPropagation();  // Evita que el evento de clic se propague al documento
    });
});

var valores = generarArreglo(1, 100); 
var contenedor = document.getElementById('contenedor');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var i, j, a = j - 1;

function generarArreglo(inicio, fin) {
  var arreglo = [];
  for (var i = inicio; i <= fin; i++) {
    arreglo.push(i);
  }
  return arreglo;
}

async function desordenarArreglo() {
  for (var i = valores.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = valores[i];
    valores[i] = valores[j];
    valores[j] = temp;

    crearBarras();

    await delay(25);
  }
}

function crearBarras() {
  // Eliminar barras existentes
  while (contenedor.firstChild) {
      contenedor.firstChild.remove();
  }

  // Crear nuevas barras
  valores.forEach((valor) => {
      var barra = document.createElement('div');
      barra.style.height = (valor * 4) + 'px';
      barra.classList.add('barra');

      contenedor.appendChild(barra);
  });
}

async function insertionSort() {
  
  for (i = 1; i < valores.length; i++) {
      for (j = i; j > 0 && valores[j - 1] > valores[j]; j--) {
          
          var temp = valores[j];
          valores[j] = valores[j - 1];
          valores[j - 1] = temp;

          crearBarras();

          await delay(50);
      }
      j = 0;
      
      crearBarras();
  }
}

async function bubbleSort() {
  for(var i = 0; i < valores.length; i++) {
      for(var j = 0; j < ( valores.length - i -1 ); j++) {
          if(valores[j] > valores[j+1]) {
            var temp = valores[j]
            valores[j] = valores[j + 1]
            valores[j+1] = temp
          }
          crearBarras();

          await delay(50);
      }
      j = 0;
      
      crearBarras();
  }
}

async function selectionSort() {
  for (var i = 0; i < valores.length; i++) {
      let min = i;
      for (var j = i + 1; j < valores.length; j++) {
          if (valores[min] > valores[j]) {
              min = j;
          }
      }
      if (i != min) {
          [valores[i], valores[min]] = [valores[min], valores[i]];

          // Actualizar visualización y esperar
          crearBarras();
          await delay(50);
      }
  }
}

async function heapSort() {
  let size = valores.length;

  for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
      await heapify(valores, size, i);

  for (let i = size - 1; i >= 0; i--) {
      let temp = valores[0];
      valores[0] = valores[i];
      valores[i] = temp;
      await heapify(valores, i, 0);
  }
  crearBarras();
}

async function heapify(array, size, i) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && array[left] > array[max])
      max = left;

  if (right < size && array[right] > array[max])
      max = right;

  if (max != i) {
      let temp = array[i];
      array[i] = array[max];
      array[max] = temp;

      // Actualizar visualización y esperar
      crearBarras();
      await delay(50);

      await heapify(array, size, max);
  }
}

async function mergeSort() {
  await startMergeSort(valores, 0, valores.length - 1);
}

async function startMergeSort(arr, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await startMergeSort(arr, start, mid);
    await startMergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  }
}

async function merge(arr, start, mid, end) {
  let start2 = mid + 1;

  while (start <= mid && start2 <= end) {
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;

      while (index != start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      // Actualizar visualización y esperar
      crearBarras();
      await delay(50);

      start++;
      mid++;
      start2++;
    }
  }
  // Actualizar visualización una última vez después de que se completa la fusión
  crearBarras();
}

async function quickSort() { 
  await startQuickSort(valores, 0, valores.length - 1);
}

async function startQuickSort(array, start, end) {
  if (start >= end) {
    return array;
  }
  var rStart = start, rEnd = end;
  var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
  while (start < end) {
    while (array[start] <= pivot) start++;
    while (array[end] > pivot) end--;
    if (start < end) {
      var temp = array[start];
      array[start] = array[end];
      array[end] = temp;

      // Actualizar visualización y esperar
      crearBarras();
      await delay(50);
    }
  }
  await startQuickSort(array, rStart, start - 1);
  await startQuickSort(array, start, rEnd);

  // Actualizar visualización una última vez después de que se completa la ordenación
  crearBarras();
}

document.addEventListener("DOMContentLoaded", function() {
  crearBarras();
});