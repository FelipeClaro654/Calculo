require 'test_helper'

class ProcessosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @processo = processos(:one)
  end

  test "should get index" do
    get processos_url
    assert_response :success
  end

  test "should get new" do
    get new_processo_url
    assert_response :success
  end

  test "should create processo" do
    assert_difference('Processo.count') do
      post processos_url, params: { processo: { acordao,: @processo.acordao,, base_calculo_autor,: @processo.base_calculo_autor,, cbpm_ipesp_id: @processo.cbpm_ipesp_id, cbpm_ipesp_valor: @processo.cbpm_ipesp_valor, cruz_iamspe_id: @processo.cruz_iamspe_id, cruz_iamspe_valor: @processo.cruz_iamspe_valor, data_base,: @processo.data_base,, data_calculo_id: @processo.data_calculo_id, data_citacao: @processo.data_citacao, data_distribuicao: @processo.data_distribuicao, juros: @processo.juros, numero,: @processo.numero,, periodo_final: @processo.periodo_final, periodo_inicial: @processo.periodo_inicial, re,: @processo.re,, sentenca,: @processo.sentenca,, tabela_atualizacao_id: @processo.tabela_atualizacao_id, tipo_juros_id: @processo.tipo_juros_id, tipo_processo,: @processo.tipo_processo,, vara,: @processo.vara, } }
    end

    assert_redirected_to processo_url(Processo.last)
  end

  test "should show processo" do
    get processo_url(@processo)
    assert_response :success
  end

  test "should get edit" do
    get edit_processo_url(@processo)
    assert_response :success
  end

  test "should update processo" do
    patch processo_url(@processo), params: { processo: { acordao,: @processo.acordao,, base_calculo_autor,: @processo.base_calculo_autor,, cbpm_ipesp_id: @processo.cbpm_ipesp_id, cbpm_ipesp_valor: @processo.cbpm_ipesp_valor, cruz_iamspe_id: @processo.cruz_iamspe_id, cruz_iamspe_valor: @processo.cruz_iamspe_valor, data_base,: @processo.data_base,, data_calculo_id: @processo.data_calculo_id, data_citacao: @processo.data_citacao, data_distribuicao: @processo.data_distribuicao, juros: @processo.juros, numero,: @processo.numero,, periodo_final: @processo.periodo_final, periodo_inicial: @processo.periodo_inicial, re,: @processo.re,, sentenca,: @processo.sentenca,, tabela_atualizacao_id: @processo.tabela_atualizacao_id, tipo_juros_id: @processo.tipo_juros_id, tipo_processo,: @processo.tipo_processo,, vara,: @processo.vara, } }
    assert_redirected_to processo_url(@processo)
  end

  test "should destroy processo" do
    assert_difference('Processo.count', -1) do
      delete processo_url(@processo)
    end

    assert_redirected_to processos_url
  end
end
